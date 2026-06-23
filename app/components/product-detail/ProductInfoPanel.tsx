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
      <p className={styles.brand}>{brand}</p>
      <h1 className={styles.name}>{name}</h1>

      <div className={styles.ratingRow}>
        <span className={styles.rating}>★ {rating.toFixed(1)}</span>
        <span className={styles.reviewCount}>후기 {reviewCount}개</span>
      </div>

      {badge && (
        <span
          className={styles.badge}
          style={{ backgroundColor: badge.bgColor }}
        >
          {badge.text}
        </span>
      )}

      <div className={styles.priceBlock}>
        <div className={styles.discountRow}>
          <span className={styles.discountRate}>{discountRate}%</span>
          <span className={styles.originalPrice}>
            {originalPrice.toLocaleString()}원
          </span>
        </div>
        <p className={styles.finalPrice}>{price.toLocaleString()}원</p>
      </div>

      <button className={styles.couponBtn}>쿠폰받기</button>
    </div>
  );
}
