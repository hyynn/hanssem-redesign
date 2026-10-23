import { notFound } from "next/navigation";
import Link from "next/link";
import ProductOverview from "../../components/product-detail/ProductOverview";
import PromotionBanner from "../../components/product-detail/PromotionBanner";
import ProductTabLayout from "../../components/product-detail/ProductTabLayout";
import ProductDetailTabs from "../../components/product-detail/ProductDetailTabs";
import ProductDetailSection from "../../components/product-detail/ProductDetailSection";
import PrePurchaseNotice from "../../components/product-detail/PrePurchaseNotice";
import ReviewSection from "../../components/product-detail/ReviewSection";
import QnaSection from "../../components/product-detail/QnaSection";
import DeliverySection from "../../components/product-detail/DeliverySection";
import { getProductDetail } from "../../lib/products";
import { attachImageDimensions } from "@/lib/image-dimensions";
import { ArrowIcon } from "@/app/components/Icon";
import { resolveBreadcrumbLinks } from "@/app/components/category/categoryConfig";
import styles from "./page.module.css";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const rawProduct = getProductDetail(id);
  if (!rawProduct) notFound();

  // 섹션 이미지에 고유 크기를 부여해 lazy load 시 레이아웃 시프트(CLS) 방지
  const product = { ...rawProduct, sections: attachImageDimensions(rawProduct.sections) };

  const crumbs = resolveBreadcrumbLinks(product.breadcrumb);

  return (
    <div className={styles.page}>
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

      <ProductTabLayout
        reviewCount={product.reviews.count}
        qnaCount={product.qnaItems.length}
        panels={{
          info: (
            <>
              <ProductDetailTabs sections={product.sections.map(({ id, label }) => ({ id, label }))} />
              {product.sections.map((section) => (
                <ProductDetailSection key={section.id} section={section} />
              ))}
              <PrePurchaseNotice notices={product.notices} />
            </>
          ),
          review: <ReviewSection data={product.reviews} />,
          qna: <QnaSection items={product.qnaItems} />,
          delivery: <DeliverySection guides={product.deliveryGuides} />,
        }}
      />
    </div>
  );
}
