"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductSummary } from "../lib/types";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: ProductSummary }) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/products/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.name} className={styles.image} />

        {product.badge && (
          <span
            className={styles.badge}
            style={{ backgroundColor: product.badge.bgColor, color: "#fff" }}
          >
            {product.badge.text}
          </span>
        )}

        <button
          className={`${styles.heart} ${liked ? styles.heartActive : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label="위시리스트 추가"
        >
          <svg className={styles.heartOutline} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#333" fillOpacity={0.3}><path d="M451.5-152q-14.5-5-25.5-16l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5q-14 0-28.5-5Z" /></svg>
          <svg className={styles.heartFilled} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff4d4f"><path d="M451.5-152q-14.5-5-25.5-16l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5q-14 0-28.5-5Z" /></svg>
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>

        <div className={styles.priceRow}>
          <span className={styles.discount}>{product.discountRate}%</span>
          <span className={styles.price}>{product.price.toLocaleString()}원</span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className={styles.colorChips}>
            {product.colors.map((color) => (
              <span
                key={color}
                className={styles.colorChip}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
