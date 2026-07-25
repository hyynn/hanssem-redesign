import { notFound } from "next/navigation";
import type { ProductSummary } from "@/app/lib/types";
import { getProductById, getByCategory } from "@/app/lib/catalog";
import CategoryHero from "@/app/components/category/CategoryHero";
import CategoryContent from "@/app/components/category/CategoryContent";
import EditorCollection from "@/app/components/category/EditorCollection";
import EventBanner from "@/app/components/category/EventBanner";
import CategoryPopularGrid from "@/app/components/category/CategoryPopularGrid";
import { CATEGORY_CONFIG } from "@/app/components/category/categoryConfig";
// 브레드크럼 임시 비활성화(하단 JSX 주석 참조) 동안 미사용 — 복원 시 주석 해제
// import Link from "next/link";
// import { ArrowIcon } from "@/app/components/Icon";
import styles from "./page.module.css";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string; subcat?: string }>;
}) {
  const { slug } = await params;
  const { tab, subcat } = await searchParams;
  const config = CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG];
  if (!config) notFound();

  const [p0, p1] = config.editor.productIds.map((id) =>
    getProductById(id)
  ) as [ProductSummary, ProductSummary];

  // 침구(bedding) 탭 비활성화 기간 동안 소품 카테고리 노출에서 침구 상품 제외
  const excludeBedding = (products: ProductSummary[]) =>
    slug === "home-deco" ? products.filter((p) => !p.category.includes("침구")) : products;

  const popularProducts = excludeBedding(getByCategory(config.popularCategory)).slice(0, 8);
  const allProducts = excludeBedding(getByCategory(config.mainCategory));

  return (
    <div className={styles.page}>
      {/* 브레드크럼 임시 비활성화 — GNB 활성 탭 + sticky 탭바가 위치를 이미 전달하므로 중복.
          복원 시 상단의 Link/ArrowIcon import 주석도 함께 해제할 것
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          홈
        </Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>{config.title}</span>
      </div>
      */}

      <CategoryContent tabs={config.tabs} allProducts={allProducts} initialTab={tab} initialSubcat={subcat}>
        <CategoryHero
          label={config.brandStory.label}
          title={config.brandStory.title}
          body={config.brandStory.body}
          ctaLabel={config.brandStory.ctaLabel}
          ctaHref={config.brandStory.ctaHref}
          image={config.heroImage}
        />
        <EditorCollection
          lifestyleImage={config.editor.lifestyleImage}
          products={[p0, p1]}
        />
        {config.eventBanner && (
          <EventBanner
            image={config.eventBanner.image}
            alt={config.eventBanner.alt}
            href={config.eventBanner.href}
            title={config.eventBanner.title}
            body={config.eventBanner.body}
          />
        )}
        <CategoryPopularGrid
          label={config.popularLabel}
          title={config.popularTitle}
          products={popularProducts}
        />
      </CategoryContent>

    </div>
  );
}
