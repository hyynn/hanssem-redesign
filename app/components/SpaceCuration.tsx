import ProductCard from "./ProductCard";
import { ProductSummary } from "../lib/types";
import styles from "./SpaceCuration.module.css";

interface SpaceCurationProps {
  title: string;
  description: string;
  image: string;
  products: ProductSummary[];
  reverse?: boolean;
}

export default function SpaceCuration({
  title,
  description,
  image,
  products,
  reverse = false,
}: SpaceCurationProps) {
  return (
    <section className={`${styles.grid} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.mainImage}>
        <img src={image} alt={title} />
        <div className={styles.floatingText}>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
