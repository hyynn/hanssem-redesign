"use client";

import { useState } from "react";
import styles from "./ReviewSection.module.css";
import { ReviewData } from "./types";

type SortOrder = "latest" | "rating-high" | "rating-low";

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

  const sortedItems = [...data.items].sort((a, b) => {
    if (sortOrder === "latest") return b.date.localeCompare(a.date);
    const d = sortOrder === "rating-high" ? b.rating - a.rating : a.rating - b.rating;
    return d !== 0 ? d : b.date.localeCompare(a.date);
  });

  const maxDist = Math.max(...data.distribution.map((d) => d.count));
  const photoImages = data.items.flatMap((r) => r.images ?? []);

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

      {photoImages.length > 0 && (
        <div className={styles.photoStrip}>
          <h3 className={styles.photoTitle}>포토 후기</h3>
          <div className={styles.photoList}>
            {photoImages.map((img, i) => (
              <div key={i} className={styles.photoThumb}>
                <img src={img} alt={fileAlt(img)} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.sortRow}>
        <select
          className={styles.sortSelect}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="latest">최신순</option>
          <option value="rating-high">평점 높은순</option>
          <option value="rating-low">평점 낮은순</option>
        </select>
      </div>

      <ul className={styles.list}>
        {sortedItems.map((review) => (
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
                {review.images.map((img, i) => (
                  <img key={i} src={img} alt={fileAlt(img)} className={styles.itemImage} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
