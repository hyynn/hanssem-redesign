import { ArrowIcon } from "@/app/components/Icon";
import styles from "./ProductInfoPanel.module.css";

interface ProductInfoPanelProps {
  brand: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  discountRate: number;
  badge?: { text: string; bgColor: string };
}

export default function ProductInfoPanel({
  brand,
  name,
  rating,
  reviewCount,
  price,
  originalPrice,
  discountRate,
  badge,
}: ProductInfoPanelProps) {
  return (
    <div className={styles.panel}>
      {/* 브랜드 행: 브랜드명(›) + 공유하기 */}
      <div className={styles.brandRow}>
        <button type="button" className={styles.brandBtn}>
          {brand}
          <ArrowIcon direction="right" size={16} aria-hidden />
        </button>
        <button type="button" className={styles.shareBtn} aria-label="공유하기">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-800ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z"/>
          </svg>
        </button>
      </div>

      <div className={styles.nameBlock}>
        <h1 className={styles.name}>{name}</h1>
        <div className={styles.ratingRow}>
          <span className={styles.rating}>★ {rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>후기 {reviewCount}개</span>
        </div>
      </div>

      <div className={styles.badgeRow}>
        {badge && (
          <span className={styles.badge} style={{ backgroundColor: badge.bgColor }}>
            {badge.text}
          </span>
        )}
      </div>

      <div className={styles.priceRow}>
        <div className={styles.priceBlock}>
          {discountRate > 0 && (
            <div className={styles.discountRow}>
              <span className={styles.discountRate}>{discountRate}%</span>
              <span className={styles.originalPrice}>
                {originalPrice.toLocaleString()}원
              </span>
            </div>
          )}
          <p className={styles.finalPrice}>{price.toLocaleString()}원</p>
        </div>

        <button className={styles.couponBtn}>쿠폰받기</button>
      </div>
    </div>
  );
}
