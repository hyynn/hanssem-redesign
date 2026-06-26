import { notFound } from "next/navigation";
import type { ProductSummary } from "@/app/lib/types";
import { getProductById, getByCategory } from "@/app/lib/catalog";
import CategoryHero from "@/app/components/category/CategoryHero";
import CategoryContent, { TabConfig } from "@/app/components/category/CategoryContent";
import EditorCollection from "@/app/components/category/EditorCollection";
import EventBanner from "@/app/components/category/EventBanner";
import CategoryPopularGrid from "@/app/components/category/CategoryPopularGrid";
import styles from "./page.module.css";

// ─── Per-category config ───────────────────────────────────────────────────────
// 새 카테고리 추가 시 이 객체에 항목 하나만 추가하면 됨.
const CATEGORY_CONFIG = {
  bedroom: {
    title: "침실",
    subtitle: "나만의 완벽한 휴식 공간을 완성하다",
    heroImage: "/images/category/bedroom/hero.webp",
    tabs: [
      {
        id: "bed", label: "침대", defaultSubcatId: "hotel-bed",
        subcategories: [
          { id: "super-single", label: "슈퍼·싱글침대", categoryName: "슈퍼·싱글침대", categoryCode: "101010",
            banner: { image: "/images/category/bedroom/bed/super-single.webp", title: "합리적인 선택, 슈퍼·싱글침대", body: "1인 생활 최적화 공간을 스마트하게 활용합니다" } },
          { id: "queen-king", label: "퀸·킹침대", categoryName: "퀸·킹침대", categoryCode: "101011",
            banner: { image: "/images/category/bedroom/bed/queen-king.webp", title: "넉넉한 여유, 퀸·킹침대", body: "두 사람이 편안하게 쉬는 최적의 침실 공간" } },
          { id: "hotel-bed", label: "호텔침대", categoryName: "호텔침대", categoryCode: "101012",
            banner: { image: "/images/category/bedroom/bed/hotel-bed.webp", title: "호텔의 편안함을 집에서", body: "프리미엄 호텔침대로 매일 밤 특별한 잠자리를" } },
          { id: "storage-bed", label: "수납침대", categoryName: "수납침대", categoryCode: "101013",
            banner: { image: "/images/category/bedroom/bed/storage-bed.webp", title: "공간을 두 배로, 수납침대", body: "침대 하부 공간을 활용한 스마트한 수납 솔루션" } },
          { id: "family-bed", label: "저상형·패밀리침대", categoryName: "저상형·패밀리침대", categoryCode: "101014",
            banner: { image: "/images/category/bedroom/bed/family-bed.webp", title: "낮고 넓은 패밀리침대", body: "아이와 함께하는 안전하고 넓은 침실" } },
        ],
      },
      {
        id: "mattress", label: "매트리스",
        subcategories: [
          { id: "ss-mattress", label: "슈퍼·싱글매트리스", categoryName: "슈퍼·싱글매트리스", categoryCode: "101110",
            banner: { image: "/images/category/bedroom/mattress/ss-mattress.webp", title: "딱 맞는 나만의 수면 공간", body: "1인용 최적 사이즈의 편안한 매트리스" } },
          { id: "qk-mattress", label: "퀸·킹매트리스", categoryName: "퀸·킹매트리스", categoryCode: "101111",
            banner: { image: "/images/category/bedroom/mattress/qk-mattress.webp", title: "함께 꿈꾸는 편안한 밤", body: "넉넉한 사이즈로 완성하는 최적의 수면" } },
          { id: "topper", label: "토퍼·하단매트리스", categoryName: "토퍼·하단매트리스", categoryCode: "101112",
            banner: { image: "/images/category/bedroom/mattress/topper.webp", title: "수면의 질을 한 단계 높이다", body: "기존 매트리스 위에 더하는 프리미엄 수면 경험" } },
        ],
      },
      {
        id: "dresser", label: "화장대",
        subcategories: [
          { id: "vanity", label: "화장대·서랍장", categoryName: "화장대",
            banner: { image: "/images/category/bedroom/dresser/vanity.webp", title: "아침을 가다듬는 공간", body: "미니멀한 디자인과 실용적인 수납의 드레싱 공간" } },
        ],
      },
      {
        id: "storage", label: "수납장",
        subcategories: [
          { id: "chest", label: "서랍장", categoryName: "서랍장",
            banner: { image: "/images/category/bedroom/dresser/chest.webp", title: "정리된 일상의 시작", body: "깔끔한 수납으로 침실 공간을 더욱 여유롭게" } },
        ],
      },
      {
        id: "nightstand", label: "협탁",
        subcategories: [
          { id: "nightstand-panel", label: "협탁·침대패널", categoryName: "협탁·침대패널",
            banner: { image: "/images/category/bedroom/dresser/nightstand.webp", title: "침대 곁의 작은 여유", body: "잠들기 전과 깨어난 후 손 닿는 곳의 편리함" } },
        ],
      },
    ] satisfies TabConfig[],
    editor: {
      lifestyleImage: "/images/category/bedroom/editor-lifestyle.webp",
      // 에디터 추천 상품 2개 (가로형 카드)
      productIds: ["1010120013", "1010120012"] as [string, string],
    },
    popularCategory: "침실",
    popularLabel: "Best of Month",
    popularTitle: "이번 달 인기 상품",
    brandStory: {
      label: "한샘이 생각하는 침실",
      title: "숙면을 설계하는 공간",
      body: "좋은 침실은 잠드는 순간도, 깨어나는 순간도 고요합니다.\n한샘은 공간의 비례와 소재의 질감부터 빛의 흐름까지\n깊이 있는 공간설계로 온전한 휴식을 만들어드립니다.",
      ctaLabel: "알아보기",
      ctaHref: "#",
      image: "/images/category/bedroom/brand-story.webp",
      imageAlt: "한샘 침실 브랜드 스토리",
    },
    eventBanner: {
      image: "/images/category/bedroom/event-banner.webp",
      alt: "침실 이벤트 · 프로모션 배너",
      href: "#",
      title: "궁극의 편안함\n한샘 매트리스",
      body: "55년간 한국인의 공간과 생활을\n연구한 한샘이 연구하고 설계한 매트리스\n12만명이 먼저 경험한 궁극의 편안함",
    },
  },
  // livingroom: { ... },
  // dining: { ... },
} satisfies Record<string, CategoryPageConfig>;

// ─── Types ────────────────────────────────────────────────────────────────────
interface CategoryPageConfig {
  title: string;
  subtitle?: string;
  heroImage: string;
  tabs: TabConfig[];
  eventBanner?: { image: string; alt?: string; href?: string; title?: string; body?: string };
  editor: {
    lifestyleImage: string;
    productIds: [string, string];
  };
  popularCategory: string;
  popularLabel?: string;
  popularTitle?: string;
  brandStory: {
    label?: string;
    title: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
    image: string;
    imageAlt?: string;
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG];
  if (!config) notFound();

  const [p0, p1] = config.editor.productIds.map((id) =>
    getProductById(id)
  ) as [ProductSummary, ProductSummary];

  const popularProducts = getByCategory(config.popularCategory, 8);
  const allProducts = getByCategory("침실");

  return (
    <>
      <div className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbLink}>
          홈
        </a>
        <span className={styles.sep}>›</span>
        <span>{config.title}</span>
      </div>

      <CategoryContent tabs={config.tabs} allProducts={allProducts}>
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

    </>
  );
}
