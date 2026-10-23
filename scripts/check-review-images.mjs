// 리뷰 사진 경로 검증 — `npm run build` 전에 prebuild로 자동 실행.
// reviews.ts의 이미지 경로는 손으로 작성하므로 복사·붙여넣기 실수(다른 패밀리 폴더 참조,
// 번호 오타, 다른 리뷰 사진 중복 참조)가 생겨도 빌드 에러가 나지 않고 화면에 빈 사진으로만
// 드러난다. 이를 빌드 전에 잡기 위한 스크립트.
//
// 에러(빌드 중단): 파일 없음 / 경로 형식 위반 / 리뷰 id ↔ 파일 번호 불일치 /
//                  다른 패밀리 폴더 참조 / 사진 순번 불연속 / 같은 사진을 여러 리뷰가 참조
// 경고(빌드 진행): 어느 리뷰에도 연결되지 않은 파일 / 패밀리에 없는 SKU 폴더
//                  (예: 색상 통합 전 SKU 폴더를 그대로 쓰는 171310003)
// `// TODO(review-photo)` 주석 처리된 경로는 사진 추가 대기 중이라 검사 대상에서 제외하고 개수만 안내.
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FAMILIES_DIR = path.join(ROOT, "app/lib/products/families");
const PUBLIC_DIR = path.join(ROOT, "public");
const REVIEWS_IMG_DIR = path.join(PUBLIC_DIR, "images/reviews");
const PATH_RE = /^\/images\/reviews\/(\d{10})\/review-(\d{2})-(\d+)\.webp$/;

function findFiles(dir, name) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return findFiles(p, name);
    return e.name === name ? [p] : [];
  });
}

// 주석 제거 (줄 주석은 줄 맨 앞의 // 만 — 리뷰 본문 문자열 안의 // 오인 방지)
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((l) => !l.trim().startsWith("//"))
    .join("\n");
}

const errors = [];
const warnings = [];
const referenced = new Set();
let todoCount = 0;
let imageCount = 0;

for (const reviewsFile of findFiles(FAMILIES_DIR, "reviews.ts").sort()) {
  const familyDir = path.dirname(reviewsFile);
  const family = path.basename(familyDir);
  const rel = path.relative(ROOT, reviewsFile);
  const raw = fs.readFileSync(reviewsFile, "utf8");
  todoCount += (raw.match(/TODO\(review-photo\)/g) ?? []).length;

  const indexSrc = fs.readFileSync(path.join(familyDir, "index.ts"), "utf8");
  const skus = new Set([...indexSrc.matchAll(/\bid:\s*"(\d{10})"/g)].map((m) => m[1]));

  const reviewsPart = stripComments(raw).split("sharedQnaItems")[0];
  const owners = new Map(); // 경로 → 참조한 리뷰 id 목록

  // 리뷰 객체 단위로 분리: 각 id 위치부터 다음 id 위치까지
  const idMatches = [...reviewsPart.matchAll(/id:\s*"(r-([a-z])(\d+))"/g)];
  idMatches.forEach((m, i) => {
    const [, rid, , num] = m;
    const body = reviewsPart.slice(m.index, idMatches[i + 1]?.index ?? reviewsPart.length);
    const images = body.match(/images:\s*\[([\s\S]*?)\]/);
    if (!images) return;

    const seqs = [];
    for (const [, src] of images[1].matchAll(/"([^"]+)"/g)) {
      imageCount++;
      referenced.add(src);
      owners.set(src, [...(owners.get(src) ?? []), rid]);

      const pm = src.match(PATH_RE);
      if (!pm) {
        errors.push(`${rel} ${rid}: 경로 형식 위반 ${src}`);
        continue;
      }
      const [, productId, nn, seq] = pm;
      seqs.push(Number(seq));
      if (!fs.existsSync(path.join(PUBLIC_DIR, src))) errors.push(`${rel} ${rid}: 파일 없음 ${src}`);
      if (nn !== num.padStart(2, "0")) errors.push(`${rel} ${rid}: 리뷰 번호(${num})와 파일 번호(${nn}) 불일치 ${src}`);
      if (productId.slice(0, 9) !== family) errors.push(`${rel} ${rid}: 다른 패밀리 폴더 참조 ${src}`);
      else if (skus.size && !skus.has(productId)) warnings.push(`${rel} ${rid}: 패밀리에 없는 SKU 폴더 ${productId}`);
    }
    const sorted = [...seqs].sort((a, b) => a - b);
    if (sorted.some((s, k) => s !== k + 1)) errors.push(`${rel} ${rid}: 사진 순번 불연속 [${seqs.join(", ")}]`);
  });

  for (const [src, rids] of owners) {
    if (rids.length > 1) errors.push(`${rel}: 같은 사진을 여러 리뷰가 참조 [${rids.join(", ")}] ${src}`);
  }
}

if (fs.existsSync(REVIEWS_IMG_DIR)) {
  for (const dir of fs.readdirSync(REVIEWS_IMG_DIR, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    for (const file of fs.readdirSync(path.join(REVIEWS_IMG_DIR, dir.name))) {
      if (file.startsWith(".")) continue;
      const src = `/images/reviews/${dir.name}/${file}`;
      if (!referenced.has(src)) warnings.push(`어느 리뷰에도 연결되지 않은 파일 ${src}`);
    }
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);
if (todoCount) console.log(`ℹ 사진 추가 대기 중인 리뷰 경로 ${todoCount}줄 — grep "TODO(review-photo)"로 확인`);

if (errors.length) {
  for (const e of errors) console.error(`✖ ${e}`);
  console.error(`\n리뷰 사진 검증 실패: 에러 ${errors.length}건`);
  process.exit(1);
}
console.log(`✓ 리뷰 사진 검증 통과 (사진 참조 ${imageCount}개)`);
