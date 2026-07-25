import { notFound } from "next/navigation";
import Link from "next/link";
import ProductOverview from "../../components/product-detail/ProductOverview";
import PromotionBanner from "../../components/product-detail/PromotionBanner";
import ProductTabLayout from "../../components/product-detail/ProductTabLayout";
import { getProductDetail } from "../../lib/products";
import { ArrowIcon } from "@/app/components/Icon";
import { resolveBreadcrumbLinks } from "@/app/components/category/categoryConfig";
import styles from "./page.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = getProductDetail(id);
  if (!product) notFound();

  const crumbs = resolveBreadcrumbLinks(product.breadcrumb);

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        {crumbs.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`}>
            {crumb.href ? (
              <Link href={crumb.href} className={styles.breadcrumbLink}>
                {crumb.label}
              </Link>
            ) : (
              crumb.label
            )}
            {index < crumbs.length - 1 && (
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
