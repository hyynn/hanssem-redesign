"use client";

import { useRouter } from "next/navigation";
import { ProductSummary } from "../lib/types";
import { WishlistBtn } from "./Icon";
import { COLOR_HEX } from "@/lib/filter-dimensions";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: ProductSummary }) {
  const router = useRouter();

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/products/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.name} className={styles.image} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" className={styles.imageHover} aria-hidden="true" />
        )}

        {product.badge && (
          <span
            className={styles.badge}
            style={{ backgroundColor: product.badge.bgColor }}
          >
            {product.badge.text}
          </span>
        )}

        <WishlistBtn className={styles.heart} size={20} />
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>

        <div className={styles.priceRow}>
          {product.discountRate > 0 && (
            <span className={styles.discount}>{product.discountRate}%</span>
          )}
          <span className={styles.price}>{product.price.toLocaleString()}원</span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className={styles.colorChips}>
            {product.colors.map((color) => (
              <span
                key={color}
                className={styles.colorChip}
                style={{ backgroundColor: COLOR_HEX[color] ?? color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
