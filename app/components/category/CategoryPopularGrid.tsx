import type { ProductSummary } from "@/app/lib/types";
import ProductCard from "@/app/components/ProductCard";
import styles from "./CategoryPopularGrid.module.css";

interface Props {
  label?: string;
  title?: string;
  products: ProductSummary[];
  href?: string;
}

export default function CategoryPopularGrid({
  label = "Best of Month",
  title = "이번 달 인기 상품",
  products,
  href = "#",
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>{label}</p>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <a href={href} className={styles.more}>
          더보기 ›
        </a>
      </div>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
