"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./ReviewSection.module.css";
import { ReviewData, Review } from "./types";
import ReviewPhotoModal from "./ReviewPhotoModal";
import SortDropdown, { SortOrder } from "./SortDropdown";

interface ModalState {
  reviewIndex: number;
  imageIndex: number;
}

function Stars({ rating, large = false }: { rating: number; large?: boolean }) {
  const full = Math.round(rating);
  return (
    <span className={`${styles.stars} ${large ? styles.starsLg : ""}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < full ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </span>
  );
}

function fileAlt(src: string): string {
  return src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? src;
}

export default function ReviewSection({ data }: { data: ReviewData }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const photoListRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState<boolean | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const checkPhotoEdges = () => {
    const el = photoListRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth + 1);
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const wrapper = photoWrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(checkPhotoEdges);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const scrollPhotos = (dir: "left" | "right") => {
    photoListRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = useCallback((reviewIdx: number, imgIdx: number) => {
    setModal({ reviewIndex: reviewIdx, imageIndex: imgIdx });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const goPrev = useCallback(
    () => setModal((m) => m && m.reviewIndex > 0
      ? { reviewIndex: m.reviewIndex - 1, imageIndex: 0 }
      : m),
    []
  );

  const goNext = useCallback(
    () => setModal((m) => m !== null
      ? { reviewIndex: m.reviewIndex + 1, imageIndex: 0 }
      : m),
    []
  );

  const setModalImageIndex = useCallback(
    (idx: number) => setModal((m) => m ? { ...m, imageIndex: idx } : m),
    []
  );

  const sortedItems = [...data.items].sort((a, b) => {
    if (sortOrder === "latest") return b.date.localeCompare(a.date);
    const d = sortOrder === "rating-high" ? b.rating - a.rating : a.rating - b.rating;
    return d !== 0 ? d : b.date.localeCompare(a.date);
  });

  const maxDist = Math.max(...data.distribution.map((d) => d.count));
  const photoReviews: Review[] = data.items.filter(
    (r) => r.images && r.images.length > 0
  );
  const photoArrowsVisible = canScroll === true;

  return (
    <section id="review" className={styles.section}>
      <h2 className={styles.heading}>
        구매후기 <span>({data.count})</span>
      </h2>

      <div className={styles.summary}>
        <div className={styles.summaryScore}>
          <span className={styles.scoreNumber}>{data.rating}</span>
          <Stars rating={data.rating} large />
          <span className={styles.scoreCount}>{data.count}개의 구매후기</span>
        </div>
        <div className={styles.summaryBars}>
          {data.distribution.map(({ stars, count }) => (
            <div key={stars} className={styles.barRow}>
              <span className={styles.barLabel}>{stars}★</span>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: maxDist > 0 ? `${(count / maxDist) * 100}%` : "0%" }}
                />
              </div>
              <span className={styles.barCount}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {photoReviews.length > 0 && (
        <div className={styles.photoStrip}>
          <h3 className={styles.photoTitle}>포토 후기</h3>
          <div className={styles.photoListWrapper} ref={photoWrapperRef}>
            <button
              className={`${styles.photoArrow} ${!photoArrowsVisible ? styles.photoArrowHidden : atStart ? styles.photoArrowDisabled : ""}`}
              onClick={() => scrollPhotos("left")}
              aria-label="이전 포토 후기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
                <path d="m388.87-480 300.46 300.46q14.97 15.35 15.09 37.73.12 22.38-15.42 38.58-16.01 15.64-38.39 15.64t-38.02-15.64l-315.02-314.7q-13.21-13.2-19.38-29.3-6.18-16.1-6.18-32.77t6.18-32.77q6.17-16.1 19.38-29.3L613.26-857.2q15.64-16.02 37.57-15.89 21.92.12 38.5 16.32 14.97 16.02 15.31 38.15.33 22.14-15.31 38.16L388.87-480Z" />
              </svg>
            </button>

            <div
              className={styles.photoList}
              ref={photoListRef}
              onScroll={checkPhotoEdges}
            >
              {photoReviews.map((review, idx) => (
                <button
                  key={review.id}
                  className={styles.photoThumb}
                  onClick={() => openModal(idx, 0)}
                  aria-label={`${review.userName} 리뷰 사진 보기`}
                >
                  <img src={review.images![0]} alt={fileAlt(review.images![0])} />
                </button>
              ))}
            </div>

            <button
              className={`${styles.photoArrow} ${!photoArrowsVisible ? styles.photoArrowHidden : atEnd ? styles.photoArrowDisabled : ""}`}
              onClick={() => scrollPhotos("right")}
              aria-label="다음 포토 후기"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
                <path d="M571.93-481.33 271.46-781.8q-15.34-15.35-15.46-37.61-.12-22.26 15.23-37.89 16.02-16.02 38.56-16.02 22.54 0 38.18 16.02l314.7 313.89q13.2 13.21 19.37 29.31 6.18 16.1 6.18 32.77 0 16.66-6.18 32.76-6.17 16.11-19.37 29.31L347.54-104.13q-16.02 16.01-37.87 15.51-21.86-.5-37.87-16.51-15.35-16.01-15.68-38.04-.34-22.02 15.68-38.03l300.13-300.13Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={styles.sortRow}>
        <SortDropdown value={sortOrder} onChange={setSortOrder} />
      </div>

      <ul className={styles.list}>
        {sortedItems.map((review) => {
          const photoIdx = photoReviews.findIndex((r) => r.id === review.id);
          return (
            <li key={review.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <Stars rating={review.rating} />
                <span className={styles.itemUser}>{review.userName}</span>
                <span className={styles.itemDate}>{review.date}</span>
              </div>
              <p className={styles.itemVariant}>{review.variant}</p>
              <p className={styles.itemContent}>{review.content}</p>
              {review.images && review.images.length > 0 && (
                <div className={styles.itemImages}>
                  {review.images.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt={fileAlt(img)}
                      className={styles.itemImage}
                      onClick={() => openModal(photoIdx, imgIdx)}
                    />
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {modal !== null && (
        <ReviewPhotoModal
          review={photoReviews[modal.reviewIndex]}
          activeImageIndex={modal.imageIndex}
          onImageSelect={setModalImageIndex}
          hasPrev={modal.reviewIndex > 0}
          hasNext={modal.reviewIndex < photoReviews.length - 1}
          onPrev={goPrev}
          onNext={goNext}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
