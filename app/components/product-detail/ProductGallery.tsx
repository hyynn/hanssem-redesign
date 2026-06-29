"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./ProductGallery.module.css";

function fileAlt(src: string): string {
  return src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? src;
}

interface ProductGalleryProps {
  images: string[];
  activeIndex: number;
  onSelectThumbnail: (index: number) => void;
}

export default function ProductGallery({
  images,
  activeIndex,
  onSelectThumbnail,
}: ProductGalleryProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const checkEdges = () => {
    const container = listRef.current;
    if (!container) return;
    setAtStart(container.scrollLeft <= 0);
    setAtEnd(container.scrollLeft + container.clientWidth >= container.scrollWidth - 1);
  };

  useEffect(() => {
    checkEdges();
  }, []);

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
        <img src={images[activeIndex]} alt={fileAlt(images[activeIndex])} className={styles.mainImage} />
      </div>

      <div className={styles.thumbnailRow}>
        <button
          className={`${styles.arrowLeft} ${atStart ? styles.arrowDisabled : ""}`}
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
              onClick={() => onSelectThumbnail(index)}
              aria-label={`${index + 1}번 이미지 보기`}
            >
              <img src={image} alt={fileAlt(image)} />
            </button>
          ))}
        </div>

        <button
          className={`${styles.arrowRight} ${atEnd ? styles.arrowDisabled : ""}`}
          onClick={() => scrollThumbnails("right")}
          aria-label="다음 썸네일"
        >
          <ArrowIcon direction="right" size={40} />
        </button>
      </div>
    </div>
  );
}
