"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowIcon } from "@/app/components/Icon";
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
              <ArrowIcon direction="left" size={40} />
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
              <ArrowIcon direction="right" size={40} />
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
