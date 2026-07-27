import type { TabConfig } from "./CategoryContent";

// ─── Per-category config ───────────────────────────────────────────────────────
// 새 카테고리 추가 시 이 객체에 항목 하나만 추가하면 됨.
export const CATEGORY_CONFIG = {
  bedroom: {
    title: "침실",
    mainCategory: "침실",
    subtitle: "나만의 완벽한 휴식 공간을 완성하다",
    heroImage: "/images/category/bedroom/hero.webp",
    tabs: [
      {
        id: "bed", label: "침대",
        subcategories: [
          {
            id: "hotel-bed", label: "호텔침대", categoryName: "호텔침대", categoryCode: "101012",
            banner: { image: "/images/category/bedroom/bed/hotel-bed.webp", title: "호텔의 편안함을 집에서", body: "프리미엄 호텔침대로 매일 밤 특별한 잠자리를" }
          },
          {
            id: "storage-bed", label: "수납침대", categoryName: "수납침대", categoryCode: "101013",
            banner: { image: "/images/category/bedroom/bed/storage-bed.webp", title: "공간을 두 배로, 수납침대", body: "침대 하부 공간을 활용한 스마트한 수납 솔루션" }
          },
          {
            id: "family-bed", label: "저상형·패밀리침대", categoryName: "저상형·패밀리침대", categoryCode: "101014",
            banner: { image: "/images/category/bedroom/bed/family-bed.webp", title: "낮고 넓은 패밀리침대", body: "아이와 함께하는 안전하고 넓은 침실" }
          },
          {
            id: "super-single", label: "SS침대", categoryName: "SS침대", categoryCode: "101010",
            banner: { image: "/images/category/bedroom/bed/super-single.webp", title: "합리적인 선택, 슈퍼싱글침대", body: "1인 생활 최적화 공간을 스마트하게 활용합니다" }
          },
          {
            id: "queen-king", label: "Q/K침대", categoryName: "Q/K침대", categoryCode: "101011",
            banner: { image: "/images/category/bedroom/bed/queen-king.webp", title: "넉넉한 여유, 퀸/킹침대", body: "두 사람이 편안하게 쉬는 최적의 침실 공간" }
          },
          {
            id: "kk-bed", label: "KK침대", categoryName: "KK침대",
            banner: { image: "/images/category/bedroom/bed/kk-bed.webp", title: "킹 그 이상의 공간", body: "두 사람이 충분히 여유롭게 쉬는 최대 사이즈 침대" }
          },
        ],
      },
      {
        id: "mattress", label: "매트리스",
        subcategories: [
          {
            id: "ss-mattress", label: "SS매트리스", categoryName: "슈퍼·싱글매트리스", categoryCode: "101110",
            banner: { image: "/images/category/bedroom/mattress/ss-mattress.webp", title: "딱 맞는 나만의 수면 공간", body: "1인용 최적 사이즈의 편안한 매트리스" }
          },
          {
            id: "qk-mattress", label: "Q/K매트리스", categoryName: "퀸·킹매트리스", categoryCode: "101111",
            banner: { image: "/images/category/bedroom/mattress/qk-mattress.webp", title: "함께 꿈꾸는 편안한 밤", body: "넉넉한 사이즈로 완성하는 최적의 수면" }
          },
          {
            id: "kk-mattress", label: "KK매트리스", categoryName: "KK매트리스",
            banner: { image: "/images/category/bedroom/mattress/kk-mattress.webp", title: "킹 그 이상의 수면 공간", body: "가족 모두가 여유롭게 누울 수 있는 최대 사이즈 매트리스" }
          },
          {
            id: "topper", label: "토퍼·하단매트리스", categoryName: "토퍼·하단매트리스", categoryCode: "101112",
            banner: { image: "/images/category/bedroom/mattress/topper.webp", title: "수면의 질을 한 단계 높이다", body: "기존 매트리스 위에 더하는 프리미엄 수면 경험" }
          },
        ],
      },
      {
        id: "dresser", label: "화장대",
        subcategories: [
          {
            id: "vanity", label: "화장대", categoryName: "화장대",
            banner: { image: "/images/category/bedroom/dresser/vanity.webp", title: "아침을 가다듬는 공간", body: "미니멀한 디자인과 실용적인 수납의 드레싱 공간" }
          },
        ],
      },
      {
        id: "storage", label: "서랍장",
        subcategories: [
          {
            id: "chest", label: "서랍장", categoryName: "서랍장",
            banner: { image: "/images/category/bedroom/dresser/chest.webp", title: "정리된 일상의 시작", body: "깔끔한 수납으로 침실 공간을 더욱 여유롭게" }
          },
        ],
      },
      {
        id: "nightstand", label: "협탁",
        subcategories: [
          {
            id: "nightstand-panel", label: "협탁·침대패널", categoryName: "협탁·침대패널",
            banner: { image: "/images/category/bedroom/dresser/nightstand.webp", title: "침대 곁의 작은 여유", body: "잠들기 전과 깨어난 후 손 닿는 곳의 편리함" }
          },
        ],
      },
    ] satisfies TabConfig[],
    editor: {
      lifestyleImage: "/images/category/bedroom/editor-lifestyle.webp",
      // 에디터 추천 상품 2개 (가로형 카드)
      productIds: ["1010120021", "1010120020"] as [string, string],
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
  livingroom: {
    title: "거실",
    mainCategory: "거실",
    subtitle: "일상을 더 아름답게, 거실 공간을 완성하다",
    heroImage: "/images/category/livingroom/hero.webp",
    tabs: [
      {
        id: "sofa", label: "소파",
        subcategories: [
          {
            id: "leather-sofa", label: "가죽소파", categoryName: "가죽소파", categoryCode: "111010",
            banner: { image: "/images/category/livingroom/sofa/leather-sofa.webp", title: "고급스러운 가죽의 품격", body: "내구성과 감성을 동시에, 프리미엄 가죽소파" }
          },
          {
            id: "recliner", label: "리클라이너", categoryName: "리클라이너", categoryCode: "111011",
            banner: { image: "/images/category/livingroom/sofa/recliner.webp", title: "몸이 편안해지는 각도", body: "버튼 하나로 완성되는 나만의 힐링 자세" }
          },
          {
            id: "fabric-sofa", label: "패브릭소파", categoryName: "패브릭소파", categoryCode: "111012",
            banner: { image: "/images/category/livingroom/sofa/fabric-sofa.webp", title: "부드럽고 따뜻한 패브릭", body: "집 안에 머무는 시간을 더 포근하게 만들어드립니다" }
          },
          {
            id: "floor-sofa", label: "좌식소파", categoryName: "좌식소파", categoryCode: "111013",
            banner: { image: "/images/category/livingroom/sofa/floor-sofa.webp", title: "낮고 넓은 좌식의 편안함", body: "바닥에 가까울수록 공간은 더 넓어집니다" }
          },
        ],
      },
      {
        id: "table", label: "테이블",
        subcategories: [
          {
            id: "coffee-table", label: "테이블", categoryName: "테이블", categoryCode: "111111",
            banner: { image: "/images/category/livingroom/table/coffee-table.webp", title: "거실의 중심, 테이블", body: "소재와 형태로 완성되는 거실의 포인트 가구" }
          },
          {
            id: "side-table", label: "사이드테이블", categoryName: "사이드테이블", categoryCode: "111112",
            banner: { image: "/images/category/livingroom/table/side-table.webp", title: "작지만 쓸모 있는 공간", body: "소파 옆 작은 여유, 사이드테이블" }
          },
        ],
      },
      {
        id: "cabinet", label: "거실장",
        subcategories: [
          {
            id: "tv-stand", label: "거실장", categoryName: "거실장", categoryCode: "111110",
            banner: { image: "/images/category/livingroom/cabinet/tv-stand.webp", title: "TV를 더 돋보이게", body: "수납과 디스플레이를 동시에 해결하는 거실장" }
          },
          {
            id: "storage-unit", label: "수납장", categoryName: "수납장", categoryCode: "111113",
            banner: { image: "/images/category/livingroom/cabinet/storage-unit.webp", title: "거실을 정돈하는 수납", body: "깔끔하게 정리된 거실에서 여유를 되찾으세요" }
          },
        ],
      },
    ] satisfies TabConfig[],
    editor: {
      lifestyleImage: "/images/category/livingroom/editor-lifestyle.webp",
      productIds: ["1110120012", "1110120013"] as [string, string],
    },
    popularCategory: "거실",
    popularLabel: "Best of Month",
    popularTitle: "이번 달 인기 상품",
    brandStory: {
      label: "한샘이 생각하는 거실",
      title: "함께 머무는 공간의 설계",
      body: "거실은 가족이 모이고, 일상의 이야기가 쌓이는 곳입니다.\n한샘은 편안한 비례와 정돈된 구조로\n오래 머물고 싶은 거실 공간을 만들어드립니다.",
      ctaLabel: "알아보기",
      ctaHref: "#",
      image: "/images/category/livingroom/brand-story.webp",
      imageAlt: "한샘 거실 브랜드 스토리",
    },
    eventBanner: {
      image: "/images/category/livingroom/event-banner.webp",
      alt: "거실 이벤트 · 프로모션 배너",
      href: "#",
      title: "모아 소파\n한샘이 제안하는 거실",
      body: "모듈형 구성으로 내 거실에 맞게\n자유롭게 조합하는 패브릭소파",
    },
  },
  dining: {
    title: "다이닝",
    mainCategory: "다이닝",
    subtitle: "식사 이상의 시간을 위한 공간",
    heroImage: "/images/category/dining/hero.webp",
    tabs: [
      {
        id: "table", label: "식탁",
        subcategories: [
          {
            id: "wood", label: "원목", categoryName: "원목식탁", categoryCode: "121014",
            banner: { image: "/images/category/dining/table/wood.webp", title: "자연을 닮은 원목의 결", body: "시간이 지날수록 깊어지는 원목 다이닝 공간" }
          },
          {
            id: "ceramic", label: "세라믹", categoryName: "세라믹식탁", categoryCode: "121013",
            banner: { image: "/images/category/dining/table/ceramic.webp", title: "세라믹의 단단한 아름다움", body: "스크래치에 강하고 관리가 쉬운 프리미엄 소재" }
          },
          {
            id: "table-2", label: "2인", categoryName: "2인용식탁", categoryCode: "121010",
            banner: { image: "/images/category/dining/table/table-2.webp", title: "둘이 마주 앉는 식탁", body: "작지만 완성도 높은 2인 다이닝 공간" }
          },
          {
            id: "table-4", label: "4인", categoryName: "4인용식탁", categoryCode: "121011",
            banner: { image: "/images/category/dining/table/table-4.webp", title: "가족이 함께하는 테이블", body: "4인 가족의 일상이 모이는 다이닝 공간" }
          },
          {
            id: "table-6", label: "6인이상", categoryName: "6인용식탁이상", categoryCode: "121012",
            banner: { image: "/images/category/dining/table/table-6.webp", title: "넉넉한 자리, 풍성한 식사", body: "여럿이 모여도 여유로운 대형 식탁" }
          },
        ],
      },
      {
        id: "chair", label: "의자",
        subcategories: [
          {
            id: "dining-chair", label: "식탁의자", categoryName: "식탁의자", categoryCode: "121110",
            banner: { image: "/images/category/dining/chair/dining-chair.webp", title: "테이블을 완성하는 의자", body: "소재와 디자인으로 다이닝 공간의 분위기를 결정합니다" }
          },
          {
            id: "bar-chair", label: "바체어", categoryName: "바체어", categoryCode: "121111",
            banner: { image: "/images/category/dining/chair/bar-chair.webp", title: "높이에서 오는 여유", body: "아일랜드 테이블과 함께하는 세련된 바체어" }
          },
          {
            id: "bench", label: "벤치·스툴의자", categoryName: "벤치·스툴의자", categoryCode: "121112",
            banner: { image: "/images/category/dining/chair/bench.webp", title: "함께 앉는 공간", body: "여럿이 나란히 앉는 편안한 벤치 스타일" }
          },
        ],
      },
      {
        id: "kitchen-storage", label: "주방수납장",
        subcategories: [
          {
            id: "kitchen-cabinet", label: "수납장", categoryName: "주방수납장", categoryCode: "121210",
            banner: { image: "/images/category/dining/kitchen/kitchen-cabinet.webp", title: "주방을 정리하는 수납", body: "주방용품을 깔끔하게 정리하는 실용적인 수납장" }
          },
          {
            id: "range-stand", label: "렌지대", categoryName: "렌지대",
            banner: { image: "/images/category/dining/kitchen/range-stand.webp", title: "주방의 중심, 렌지대", body: "전자레인지와 소형 가전을 한곳에" }
          },
          {
            id: "island-table", label: "아일랜드수납식탁", categoryName: "아일랜드수납식탁",
            banner: { image: "/images/category/dining/kitchen/island-table.webp", title: "수납과 식사를 동시에", body: "공간을 더 유연하게 활용하는 아일랜드 수납식탁" }
          },
        ],
      },
    ] satisfies TabConfig[],
    editor: {
      lifestyleImage: "/images/category/dining/editor-lifestyle.webp",
      productIds: ["1210120011", "1210130010"] as [string, string],
    },
    popularCategory: "다이닝",
    popularLabel: "Best of Month",
    popularTitle: "이번 달 인기 상품",
    brandStory: {
      label: "한샘이 생각하는 다이닝",
      title: "식사를 의식으로 만드는 공간",
      body: "좋은 식사는 맛보다 먼저, 자리에서 시작됩니다.\n한샘은 소재의 온도와 테이블의 비례로\n매일의 식사가 특별한 시간이 되도록 설계합니다.",
      ctaLabel: "알아보기",
      ctaHref: "#",
      image: "/images/category/dining/brand-story.webp",
      imageAlt: "한샘 다이닝 브랜드 스토리",
    },
    eventBanner: {
      image: "/images/category/dining/event-banner.webp",
      alt: "다이닝 이벤트 · 프로모션 배너",
      href: "#",
      title: "한샘 다이닝\n원목 테이블의 계절",
      body: "자연 소재 그대로의 따뜻함\n매일의 식사를 더 풍요롭게",
    },
  },
  "home-deco": {
    title: "소품",
    mainCategory: "소품",
    subtitle: "작은 디테일이 완성하는 공간의 표정",
    heroImage: "/images/category/home-deco/hero.webp",
    // 침구(bedding) 탭 임시 비활성화 — 패밀리·상품 데이터는 삭제하지 않고
    // 카테고리 페이지 노출만 막음. 복원 시 이 탭 항목을 다시 추가할 것
    tabs: [
      {
        id: "curtain-blind", label: "커튼·블라인드",
        subcategories: [
          {
            id: "curtain", label: "커튼", categoryName: "커튼", categoryCode: "171210",
            banner: { image: "/images/category/home-deco/curtain-blind/curtain.webp", title: "빛을 조율하는 패브릭", body: "커튼 한 장으로 달라지는 공간의 온도" }
          },
          {
            id: "blind", label: "블라인드", categoryName: "블라인드", categoryCode: "171211",
            banner: { image: "/images/category/home-deco/curtain-blind/blind.webp", title: "미니멀한 창가의 완성", body: "각도로 빛을 다듬는 절제된 창 연출" }
          },
        ],
      },
      {
        id: "kitchen-organizer", label: "주방수납",
        subcategories: [
          {
            id: "organizer", label: "수납용품", categoryName: "수납용품", categoryCode: "171110",
            banner: { image: "/images/category/home-deco/kitchen-organizer/organizer.webp", title: "손에 닿는 자리의 질서", body: "자주 쓰는 물건을 정리하는 공간" }
          },
          {
            id: "container", label: "밀폐·보관용기", categoryName: "밀폐·보관용기", categoryCode: "171111",
            banner: { image: "/images/category/home-deco/kitchen-organizer/container.webp", title: "신선함을 지키는 밀폐력", body: "재료 본연의 맛을 오래 보관하는 스마트한 용기" }
          },
          {
            id: "kitchen-tidy", label: "주방정리", categoryName: "주방정리", categoryCode: "171112",
            banner: { image: "/images/category/home-deco/kitchen-organizer/kitchen-tidy.webp", title: "정돈된 주방의 여유", body: "동선을 줄이는 소품으로 손쉬운 관리" }
          },
        ],
      },
      {
        id: "deco", label: "인테리어소품",
        subcategories: [
          {
            id: "lighting", label: "조명", categoryName: "조명", categoryCode: "171310",
            banner: { image: "/images/category/home-deco/deco/lighting.webp", title: "공간의 분위기를 켜다", body: "빛의 결로 완성하는 공간의 마지막 터치" }
          },
          {
            id: "rug", label: "러그·카페트", categoryName: "러그·카페트", categoryCode: "171311",
            banner: { image: "/images/category/home-deco/deco/rug.webp", title: "바닥에서 시작되는 온기", body: "공간의 인상을 바꾸는 부드러운 감촉" }
          },
          {
            id: "deco-object", label: "데코소품", categoryName: "데코소품", categoryCode: "171312",
            banner: { image: "/images/category/home-deco/deco/deco-object.webp", title: "취향을 놓아두는 자리", body: "작은 오브제 하나로 드러나는 나만의 감각" }
          },
        ],
      },
    ] satisfies TabConfig[],
    editor: {
      lifestyleImage: "/images/category/home-deco/editor-lifestyle.webp",
      productIds: ["1712100020", "1713110010"] as [string, string],
    },
    popularCategory: "소품",
    popularLabel: "Best of Month",
    popularTitle: "이번 달 인기 상품",
    brandStory: {
      label: "한샘이 생각하는 소품",
      title: "디테일로 완성되는 공간",
      body: "공간의 인상은 마지막 한 뼘에서 결정됩니다.\n한샘은 침구의 촉감부터 조명의 온도까지\n생활에 닿는 작은 디테일로 공간의 완성도를 높입니다.",
      ctaLabel: "알아보기",
      ctaHref: "#",
      image: "/images/category/home-deco/brand-story.webp",
      imageAlt: "한샘 소품 브랜드 스토리",
    },
    eventBanner: {
      image: "/images/category/home-deco/event-banner.webp",
      alt: "소품 이벤트 · 프로모션 배너",
      href: "#",
      title: "공간의 마무리\n한샘 홈스타일링",
      body: "침구부터 조명까지\n계절에 맞는 스타일링 제안",
    },
  },
} satisfies Record<string, CategoryPageConfig>;

// 헤더 nav(데스크톱 메가메뉴·모바일 드로어)가 공유하는 카테고리 슬러그 목록·순서 —
// 두 UI가 각자 하드코딩하면 한쪽만 갱신되고 다른 쪽은 누락되는 사고가 나기 쉬워
// 여기 하나로만 관리한다. 이벤트/매거진처럼 CATEGORY_CONFIG에 없는 링크는
// 각 헤더 컴포넌트에서 별도로 이어붙인다.
export const CATEGORY_SLUGS = Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[];

export interface CategoryPageConfig {
  title: string;
  mainCategory: string;
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

// ─── Breadcrumb 매칭 ────────────────────────────────────────────────────────────
// ProductFamily.breadcrumb(문자열 3단)를 CATEGORY_CONFIG와 매칭해 각 크럼의
// 카테고리 페이지 링크를 만든다. 이름이 일치하지 않으면(어긋난 데이터) 해당
// 크럼은 href 없이 반환 — 페이지가 깨지는 대신 조용히 비클릭 텍스트로 폴백된다.
export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

export function resolveBreadcrumbLinks(breadcrumb: string[]): BreadcrumbCrumb[] {
  const [mainLabel, tabLabel, subcatLabel] = breadcrumb;

  const slug = (Object.keys(CATEGORY_CONFIG) as (keyof typeof CATEGORY_CONFIG)[]).find(
    (key) => CATEGORY_CONFIG[key].mainCategory === mainLabel
  );
  if (!slug) return breadcrumb.map((label) => ({ label }));

  const config = CATEGORY_CONFIG[slug];
  const crumbs: BreadcrumbCrumb[] = [{ label: mainLabel, href: `/category/${slug}` }];

  if (!tabLabel) return crumbs;
  const tab = config.tabs.find((t) => t.label === tabLabel);
  crumbs.push(tab ? { label: tabLabel, href: `/category/${slug}?tab=${tab.id}` } : { label: tabLabel });

  if (!subcatLabel) return crumbs;
  const subcategory = tab?.subcategories.find((s) => s.categoryName === subcatLabel);
  crumbs.push(
    subcategory
      ? { label: subcatLabel, href: `/category/${slug}?tab=${tab!.id}&subcat=${subcategory.id}` }
      : { label: subcatLabel }
  );

  return crumbs;
}
