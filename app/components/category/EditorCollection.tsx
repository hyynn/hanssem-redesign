import type { ProductSummary } from "@/app/lib/types";
import { ArrowIcon } from "@/app/components/Icon";
import Img from "@/app/components/Img";
import { formatPrice, calcDiscountRate } from "@/lib/format";
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
        <div>
          <p className={styles.label}>Editor&apos;s Pick</p>
          <h2 className={styles.title}>{sectionLabel}</h2>
        </div>
        <a href={href} className={styles.more}>
          더보기 <ArrowIcon direction="right" size="1em" />
        </a>
      </div>

      <div className={styles.body}>
        <div className={styles.lifestyle}>
          <Img
            src={lifestyleImage}
            alt={lifestyleAlt}
            className={styles.lifestyleImage}
          />
        </div>

        <div className={styles.cards}>
          {products.map((p) => {
            const discountRate = calcDiscountRate(p.price, p.originalPrice);
            return (
              <a key={p.id} href={`/products/${p.id}`} className={styles.card}>
                <div className={styles.cardThumb}>
                  <Img src={p.thumbnail} alt={p.name} className={styles.cardImage} />
                  {p.hoverImage && (
                    <Img
                      src={p.hoverImage}
                      alt=""
                      aria-hidden="true"
                      className={styles.cardImageHover}
                    />
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <p className={styles.cardBrand}>{p.brand}</p>
                  <p className={styles.cardName}>{p.name}</p>
                  <p className={styles.cardPrice}>
                    {discountRate > 0 && (
                      <span className={styles.cardDiscount}>{discountRate}%</span>
                    )}
                    {formatPrice(p.price)}원
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
