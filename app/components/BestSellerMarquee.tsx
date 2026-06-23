import ProductCard from "./ProductCard";
import { ProductSummary } from "../lib/types";
import styles from "./BestSellerMarquee.module.css";

export default function BestSellerMarquee({ products }: { products: ProductSummary[] }) {
  const looped = [...products, ...products];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h3 className={styles.title}>가장 많이 검색한 베스트셀러</h3>
      </div>
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {looped.map((product, i) => (
            <div className={styles.item} key={`${product.id}-${i}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
