// 서버 전용 (fs 사용) — 클라이언트 컴포넌트에서 import 금지.
// public/ 정적 이미지의 고유 크기를 파일 헤더에서 읽어, 상세 섹션처럼
// 비율이 이미지마다 다른 곳의 <Img width/height> 공간 확보(CLS 방지)에 쓴다.
import fs from "fs";
import path from "path";
import type { DetailBlock, ProductDetailSection } from "@/app/lib/types";

type Dimensions = { width: number; height: number };

const cache = new Map<string, Dimensions | null>();

function parseWebp(buf: Buffer): Dimensions | null {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const fourCC = buf.toString("ascii", 12, 16);
  if (fourCC === "VP8X") {
    return {
      width: 1 + buf.readUIntLE(24, 3),
      height: 1 + buf.readUIntLE(27, 3),
    };
  }
  if (fourCC === "VP8 ") {
    // 키프레임 sync code(9d 01 2a) 뒤 14비트 width/height
    if (buf[23] !== 0x9d || buf[24] !== 0x01 || buf[25] !== 0x2a) return null;
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (fourCC === "VP8L") {
    if (buf[20] !== 0x2f) return null;
    const b1 = buf[21], b2 = buf[22], b3 = buf[23], b4 = buf[24];
    return {
      width: 1 + (((b2 & 0x3f) << 8) | b1),
      height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | (b2 >> 6)),
    };
  }
  return null;
}

function parseGif(buf: Buffer): Dimensions | null {
  if (buf.toString("ascii", 0, 3) !== "GIF") return null;
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
}

function parsePng(buf: Buffer): Dimensions | null {
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/** public/ 기준 URL 경로(예: "/images/...")의 고유 크기. 실패 시 undefined (렌더는 그대로 진행) */
export function getImageDimensions(src: string): Dimensions | undefined {
  const cached = cache.get(src);
  if (cached !== undefined) return cached ?? undefined;

  let result: Dimensions | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", src);
    const fd = fs.openSync(filePath, "r");
    const buf = Buffer.alloc(32);
    try {
      fs.readSync(fd, buf, 0, 32, 0);
    } finally {
      fs.closeSync(fd);
    }
    const ext = path.extname(src).toLowerCase();
    if (ext === ".webp") result = parseWebp(buf);
    else if (ext === ".gif") result = parseGif(buf);
    else if (ext === ".png") result = parsePng(buf);
  } catch {
    result = null;
  }
  cache.set(src, result);
  return result ?? undefined;
}

/** 상세 섹션의 image 블록에 고유 width/height를 채워 반환 (서버 컴포넌트에서 호출) */
export function attachImageDimensions(sections: ProductDetailSection[]): ProductDetailSection[] {
  return sections.map((section) => ({
    ...section,
    blocks: section.blocks.map((block): DetailBlock => {
      if (block.type !== "image" || (block.width && block.height)) return block;
      const dims = getImageDimensions(block.src);
      return dims ? { ...block, ...dims } : block;
    }),
  }));
}
