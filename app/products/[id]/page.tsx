import { notFound } from "next/navigation";
import ProductOverview from "../../components/product-detail/ProductOverview";
import PromotionBanner from "../../components/product-detail/PromotionBanner";
import ProductTabLayout from "../../components/product-detail/ProductTabLayout";
import { getProductDetail } from "../../lib/products";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./page.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = getProductDetail(id);
  if (!product) notFound();

  return (
    <main>
      <div className={styles.breadcrumb}>
        {product.breadcrumb.map((crumb, index) => (
          <span key={`${crumb}-${index}`}>
            {crumb}
            {index < product.breadcrumb.length - 1 && (
              <span className={styles.separator}><ArrowIcon direction="right" size={14} /></span>
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
