"use client";

import { useState, useCallback } from "react";
import HotspotMiniCard from "./HotspotMiniCard";
import { ArrowIcon } from "./Icon";
import Img from "./Img";
import styles from "./SpaceCurationHotspot.module.css";

export interface HotspotData {
  id: string;
  x: number;
  y: number;
  productId: string;
}

interface Props {
  spaceLabel: string;
  tagline: string;
  image: string;
  viewAllHref?: string;
  hotspots: HotspotData[];
}

/* 카드 세로 정렬(핀 높이 기준 clamp)은 cardWrapper CSS에 있음 —
   뷰포트별 오프셋(--card-shift)을 미디어 쿼리로 제어하기 위해 좌표만 인라인으로 전달.
   수평은 핀 좌표 기준 — 핀이 좌측 절반이면 오른쪽에, 우측 절반이면 왼쪽에 24px 간격 */
function getCardOffset(x: number, y: number): React.CSSProperties {
  const vertical = { "--pin-y": `${y}%` } as React.CSSProperties;
  return x > 50
    ? { right: `calc(100% - ${x}% + 24px)`, ...vertical }
    : { left: `calc(${x}% + 24px)`, ...vertical };
}

export default function SpaceCurationHotspot({
  spaceLabel,
  tagline,
  image,
  viewAllHref = "#",
  hotspots,
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const togglePin = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const closeAll = useCallback(() => setActiveId(null), []);

  const pins = hotspots.slice(0, 5);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Space Curation</p>
          <h2 className={styles.title}>{spaceLabel}</h2>
        </div>
        <a href={viewAllHref} className={styles.viewAll}>전체보기 <ArrowIcon direction="right" size="1em" /></a>
      </div>

      <div className={styles.imageArea} onClick={closeAll}>
        <Img src={image} alt={spaceLabel} className={styles.image} />
        <div className={styles.gradient} />

        {pins.map((h) => (
          <div
            key={h.id}
            className={styles.pin}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={(e) => { e.stopPropagation(); togglePin(h.id); }}
          >
            <button
              className={`${styles.pinBtn} ${activeId === h.id ? styles.pinBtnActive : ""}`}
              aria-label="상품 정보 보기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                {activeId === h.id
                  ? <path d="M200-440v-80h560v80H200Z" />
                  : <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                }
              </svg>
            </button>

          </div>
        ))}

        {/* 카드는 핀이 아닌 imageArea 직속 — 이미지 기준 clamp 계산을 위해 분리 */}
        {pins.map((h) =>
          activeId === h.id ? (
            <div
              key={`card-${h.id}`}
              className={styles.cardWrapper}
              style={getCardOffset(h.x, h.y)}
              onClick={(e) => e.stopPropagation()}
            >
              <HotspotMiniCard productId={h.productId} />
            </div>
          ) : null
        )}

        <p className={styles.tagline}>{tagline}</p>
      </div>
    </section>
  );
}
