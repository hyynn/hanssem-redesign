"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowIcon } from "@/app/components/Icon";
import Img from "@/app/components/Img";
import styles from "./ProductGallery.module.css";

function fileAlt(src: string): string {
  return src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? src;
}

interface ProductGalleryProps {
  images: string[];
}

// 선택 인덱스는 갤러리 안에서만 쓰여서 내부 state로 둠 — 부모(ProductOverview)가
// state를 들고 있지 않아도 되므로 부모와 형제(상품 정보 패널 등)가 서버 컴포넌트로 남음
export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState<boolean | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkEdges = () => {
    const container = listRef.current;
    if (!container) return;
    setCanScroll(container.scrollWidth > container.clientWidth + 1);
    setAtStart(container.scrollLeft <= 0);
    setAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth - 1);
  };

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const ro = new ResizeObserver(checkEdges);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const arrowsVisible = canScroll === true;

  const scrollThumbnails = (direction: "left" | "right") => {
    const container = listRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <Img src={images[activeIndex]} alt={fileAlt(images[activeIndex])} className={styles.mainImage} priority />
      </div>

      <div className={styles.thumbnailRow}>
        <button
          className={`${styles.arrowLeft} ${!arrowsVisible ? styles.arrowHidden : atStart ? styles.arrowDisabled : ""}`}
          onClick={() => scrollThumbnails("left")}
          aria-label="이전 썸네일"
        >
          <ArrowIcon direction="left" size={40} />
        </button>

        <div className={styles.thumbnailList} ref={listRef} onScroll={checkEdges}>
          {images.map((image, index) => (
            <button
              key={image}
              className={`${styles.thumbnailButton} ${index === activeIndex ? styles.thumbnailActive : ""
                }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${index + 1}번 이미지 보기`}
            >
              <Img src={image} alt={fileAlt(image)} />
            </button>
          ))}
        </div>

        <button
          className={`${styles.arrowRight} ${!arrowsVisible ? styles.arrowHidden : atEnd ? styles.arrowDisabled : ""}`}
          onClick={() => scrollThumbnails("right")}
          aria-label="다음 썸네일"
        >
          <ArrowIcon direction="right" size={40} />
        </button>
      </div>
    </div>
  );
}
