"use client";

import { useRef, useState, useEffect } from "react";
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
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
            <path d="m388.87-480 300.46 300.46q14.97 15.35 15.09 37.73.12 22.38-15.42 38.58-16.01 15.64-38.39 15.64t-38.02-15.64l-315.02-314.7q-13.21-13.2-19.38-29.3-6.18-16.1-6.18-32.77t6.18-32.77q6.17-16.1 19.38-29.3L613.26-857.2q15.64-16.02 37.57-15.89 21.92.12 38.5 16.32 14.97 16.02 15.31 38.15.33 22.14-15.31 38.16L388.87-480Z" />
          </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
            <path d="M571.93-481.33 271.46-781.8q-15.34-15.35-15.46-37.61-.12-22.26 15.23-37.89 16.02-16.02 38.56-16.02 22.54 0 38.18 16.02l314.7 313.89q13.2 13.21 19.37 29.31 6.18 16.1 6.18 32.77 0 16.66-6.18 32.76-6.17 16.11-19.37 29.31L347.54-104.13q-16.02 16.01-37.87 15.51-21.86-.5-37.87-16.51-15.35-16.01-15.68-38.04-.34-22.02 15.68-38.03l300.13-300.13Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
