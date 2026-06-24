"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Review } from "../../lib/types";
import styles from "./ReviewPhotoModal.module.css";

interface Props {
  review: Review;
  activeImageIndex: number;
  onImageSelect: (idx: number) => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewPhotoModal({
  review,
  activeImageIndex,
  onImageSelect,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onClose,
}: Props) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const images = review.images!;
  const imgSrc = images[activeImageIndex];
  const imgAlt = imgSrc.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
          ✕
        </button>

        <div className={styles.imageArea}>
          <div className={styles.imageRow}>
            <button
              className={`${styles.navArrow} ${!hasPrev ? styles.navArrowDisabled : ""}`}
              onClick={onPrev}
              disabled={!hasPrev}
              aria-label="이전 리뷰"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="m388.87-480 300.46 300.46q14.97 15.35 15.09 37.73.12 22.38-15.42 38.58-16.01 15.64-38.39 15.64t-38.02-15.64l-315.02-314.7q-13.21-13.2-19.38-29.3-6.18-16.1-6.18-32.77t6.18-32.77q6.17-16.1 19.38-29.3L613.26-857.2q15.64-16.02 37.57-15.89 21.92.12 38.5 16.32 14.97 16.02 15.31 38.15.33 22.14-15.31 38.16L388.87-480Z" />
              </svg>
            </button>

            <div className={styles.imageWrapper}>
              <img src={imgSrc} alt={imgAlt} className={styles.image} />
            </div>

            <button
              className={`${styles.navArrow} ${!hasNext ? styles.navArrowDisabled : ""}`}
              onClick={onNext}
              disabled={!hasNext}
              aria-label="다음 리뷰"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                <path d="M571.93-481.33 271.46-781.8q-15.34-15.35-15.46-37.61-.12-22.26 15.23-37.89 16.02-16.02 38.56-16.02 22.54 0 38.18 16.02l314.7 313.89q13.2 13.21 19.37 29.31 6.18 16.1 6.18 32.77 0 16.66-6.18 32.76-6.17 16.11-19.37 29.31L347.54-104.13q-16.02 16.01-37.87 15.51-21.86-.5-37.87-16.51-15.35-16.01-15.68-38.04-.34-22.02 15.68-38.03l300.13-300.13Z" />
              </svg>
            </button>
          </div>

          <div className={styles.thumbStrip}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === activeImageIndex ? styles.thumbActive : ""}`}
                onClick={() => onImageSelect(i)}
                aria-label={`이미지 ${i + 1} 보기`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.reviewInfo}>
          <div className={styles.meta}>
            <Stars rating={review.rating} />
            <span className={styles.date}>{review.date}</span>
            {review.variant && <span className={styles.variant}>{review.variant}</span>}
          </div>
          <p className={styles.userName}>{review.userName}</p>
          <p className={styles.content}>{review.content}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
