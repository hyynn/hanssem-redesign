"use client";

import { useRouter } from "next/navigation";
import { ProductSummary, colorName } from "../lib/types";
import { WishlistBtn } from "./Icon";
import Img from "./Img";
import { COLOR_HEX } from "@/lib/filter-dimensions";
import { formatPrice, calcDiscountRate } from "@/lib/format";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }: { product: ProductSummary }) {
  const router = useRouter();
  const discountRate = calcDiscountRate(product.price, product.originalPrice);

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/products/${product.id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.imageWrapper}>
        <Img src={product.thumbnail} alt={product.name} className={styles.image} />
        {product.hoverImage && (
          <Img src={product.hoverImage} alt="" className={styles.imageHover} aria-hidden="true" />
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
          {discountRate > 0 && (
            <span className={styles.discount}>{discountRate}%</span>
          )}
          <span className={styles.price}>{formatPrice(product.price)}원</span>
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className={styles.colorChips}>
            {product.colors.map((c) => {
              const name = colorName(c);
              return (
                <span
                  key={name}
                  className={styles.colorChip}
                  style={{ backgroundColor: COLOR_HEX[name] ?? name }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
