import { notFound } from "next/navigation";
import ProductOverview from "../../components/product-detail/ProductOverview";
import PromotionBanner from "../../components/product-detail/PromotionBanner";
import ProductTabLayout from "../../components/product-detail/ProductTabLayout";
import { productMap } from "./data";
import styles from "./page.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const loader = productMap[id as keyof typeof productMap];
  if (!loader) notFound();

  const { default: product } = await loader();

  return (
    <main>
      <div className={styles.breadcrumb}>
        {product.breadcrumb.map((crumb, index) => (
          <span key={crumb}>
            {crumb}
            {index < product.breadcrumb.length - 1 && (
              <span className={styles.separator}>›</span>
            )}
          </span>
        ))}
      </div>

      <ProductOverview product={product} />

      <PromotionBanner promotions={product.promotions} />

      <ProductTabLayout product={product} />
    </main>
  );
}
