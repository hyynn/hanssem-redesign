"use client";

import { useState, useCallback } from "react";
import HotspotMiniCard from "./HotspotMiniCard";
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

function getCardOffset(x: number, y: number): React.CSSProperties {
  if (x > 65) {
    return { right: "44px", top: "50%", transform: "translateY(-50%)" };
  }
  if (x < 35) {
    return { left: "44px", top: "50%", transform: "translateY(-50%)" };
  }
  if (y > 60) {
    return { bottom: "44px", left: "50%", transform: "translateX(-50%)" };
  }
  return { top: "44px", left: "50%", transform: "translateX(-50%)" };
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
        <span className={styles.label}>{spaceLabel}</span>
        <a href={viewAllHref} className={styles.viewAll}>전체보기 →</a>
      </div>

      <div className={styles.imageArea} onClick={closeAll}>
        <img src={image} alt={spaceLabel} className={styles.image} />
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

            {activeId === h.id && (
              <div className={styles.cardWrapper} style={getCardOffset(h.x, h.y)}>
                <HotspotMiniCard productId={h.productId} />
              </div>
            )}
          </div>
        ))}

        <div className={styles.tagline}>{tagline}</div>
      </div>
    </section>
  );
}
