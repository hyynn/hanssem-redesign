import type { ProductSummary } from "@/app/lib/types";
import styles from "./EditorCollection.module.css";

interface Props {
  sectionLabel?: string;
  lifestyleImage: string;
  lifestyleAlt?: string;
  products: [ProductSummary, ProductSummary];
  href?: string;
}

export default function EditorCollection({
  sectionLabel = "에디터 추천 컬렉션",
  lifestyleImage,
  lifestyleAlt = "에디터 추천 라이프스타일",
  products,
  href = "#",
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{sectionLabel}</h2>
        <a href={href} className={styles.more}>
          더보기 ›
        </a>
      </div>

      <div className={styles.body}>
        <div className={styles.lifestyle}>
          <img
            src={lifestyleImage}
            alt={lifestyleAlt}
            className={styles.lifestyleImage}
          />
        </div>

        <div className={styles.cards}>
          {products.map((p) => (
            <a key={p.id} href={`/products/${p.id}`} className={styles.card}>
              <div className={styles.cardThumb}>
                <img src={p.thumbnail} alt={p.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardInfo}>
                <p className={styles.cardBrand}>{p.brand}</p>
                <p className={styles.cardName}>{p.name}</p>
                <p className={styles.cardPrice}>
                  <span className={styles.cardDiscount}>{p.discountRate}%</span>
                  {p.price.toLocaleString()}원
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
