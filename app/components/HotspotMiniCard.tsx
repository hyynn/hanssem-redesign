import { getProductById } from "../lib/catalog";
import Img from "./Img";
import { formatPrice, calcDiscountRate } from "@/lib/format";
import { ArrowIcon } from "./Icon";
import styles from "./HotspotMiniCard.module.css";

interface Props {
  productId: string;
}

export default function HotspotMiniCard({ productId }: Props) {
  const p = getProductById(productId);
  const discountRate = calcDiscountRate(p.price, p.originalPrice);

  return (
    <a href={`/products/${p.id}`} className={styles.card}>
      <div className={styles.image}>
        <Img src={p.thumbnail} alt={p.name} />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{p.category[0]}</span>
        <p className={styles.name}>{p.name}</p>
        <p className={styles.price}>
          {discountRate > 0 && (
            <span className={styles.discount}>{discountRate}%↓ </span>
          )}
          {formatPrice(p.price)}원
        </p>
        {/* 시각적 어포던스만 담당 — 실제 링크는 카드 전체(터치 타겟 확보) */}
        <span className={styles.link}>바로가기 <ArrowIcon direction="right" size="1em" /></span>
      </div>
    </a>
  );
}
