import ProductCard from "./ProductCard";
import { ProductSummary } from "../lib/types";
import styles from "./BestSellerGrid.module.css";

interface Props {
  products: ProductSummary[];
}

export default function BestSellerGrid({ products }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.label}>Best Seller</p>
          <h2 className={styles.title}>이번 달 가장 사랑받은 상품</h2>
        </div>
        <a href="#" className={styles.viewAll}>전체보기 →</a>
      </div>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
