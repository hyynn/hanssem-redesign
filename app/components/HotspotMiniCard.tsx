import { getProductById } from "../lib/catalog";
import styles from "./HotspotMiniCard.module.css";

interface Props {
  productId: string;
}

export default function HotspotMiniCard({ productId }: Props) {
  const p = getProductById(productId);

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={p.thumbnail} alt={p.name} />
      </div>
      <div className={styles.body}>
        <span className={styles.category}>{p.category[0]}</span>
        <p className={styles.name}>{p.name}</p>
        <p className={styles.price}>
          {p.discountRate > 0 && (
            <span className={styles.discount}>{p.discountRate}%↓ </span>
          )}
          {p.price.toLocaleString()}원
        </p>
        <a href={`/products/${p.id}`} className={styles.link}>바로가기 →</a>
      </div>
    </div>
  );
}
