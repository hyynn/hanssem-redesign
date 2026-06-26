import { ProductSummary } from "./types";
import { summaries as monoBedSummaries } from "./products/families/bedroom/bed/101012001";
import { summaries as monoDresserSummaries } from "./products/families/bedroom/dresser/101210001";
import { summaries as monoChestSummaries } from "./products/families/bedroom/dresser/101210002";
import { summaries as euroNightstandSummaries } from "./products/families/bedroom/dresser/101212001";
import { summaries as moaSofaSummaries } from "./products/families/livingroom/sofa/111012001";

export const catalog: ProductSummary[] = [
  // ─── 패밀리 상품 (각 패밀리 파일이 summaries 관리) ───────────────────────
  ...monoBedSummaries,
  ...monoDresserSummaries,
  ...monoChestSummaries,
  ...euroNightstandSummaries,
  ...moaSofaSummaries,

  // ─── 거실 ──────────────────────────────────────────────────────────────────
  {
    id: "p2001",
    familyId: "p2001",
    name: "모던 3인용 패브릭 소파",
    thumbnail: "/images/products/sofa-01.webp",
    brand: "한샘",
    price: 890000,
    originalPrice: 1280000,
    discountRate: 30,
    rating: 4.6,
    reviewCount: 112,
    badge: { text: "거실 인기 1위", bgColor: "#3a3a3a" },
    category: ["거실", "소파"],
    colors: ["#f5f0e8", "#3a3a3a", "#8a7c6a"],
  },
  {
    id: "p2002",
    familyId: "p2002",
    name: "원목 거실 커피 테이블 800",
    thumbnail: "/images/products/coffee-table-01.webp",
    brand: "한샘",
    price: 348000,
    originalPrice: 465000,
    discountRate: 25,
    rating: 4.5,
    reviewCount: 67,
    category: ["거실", "테이블"],
  },
  {
    id: "p2003",
    familyId: "p2003",
    name: "TV 장식장 1500 (수납 선택)",
    thumbnail: "/images/products/tv-stand-01.webp",
    brand: "한샘",
    price: 390000,
    originalPrice: 490000,
    discountRate: 20,
    rating: 4.4,
    reviewCount: 48,
    category: ["거실", "수납"],
    colors: ["#f5f0e8", "#3a3a3a"],
  },
  {
    id: "p2004",
    familyId: "p2004",
    name: "패브릭 1인 암체어",
    thumbnail: "/images/products/armchair-01.webp",
    brand: "한샘",
    price: 520000,
    originalPrice: 730000,
    discountRate: 29,
    rating: 4.7,
    reviewCount: 83,
    badge: { text: "베스트", bgColor: "#3a3a3a" },
    category: ["거실", "소파"],
    colors: ["#f5f0e8", "#2f4a3e", "#3a3a3a"],
  },
  {
    id: "p2005",
    familyId: "p2005",
    name: "거실 러그 200×300cm",
    thumbnail: "/images/products/rug-01.webp",
    brand: "한샘",
    price: 185000,
    originalPrice: 228000,
    discountRate: 19,
    rating: 4.3,
    reviewCount: 31,
    category: ["거실", "패브릭"],
    colors: ["#f5f0e8", "#8a7c6a"],
  },
  {
    id: "p2006",
    familyId: "p2006",
    name: "플로어 스탠드 조명 150cm",
    thumbnail: "/images/products/floor-lamp-01.webp",
    brand: "한샘",
    price: 139000,
    originalPrice: 178000,
    discountRate: 22,
    rating: 4.5,
    reviewCount: 54,
    category: ["거실", "조명"],
  },

  // ─── 다이닝 ────────────────────────────────────────────────────────────────
  {
    id: "p3001",
    familyId: "p3001",
    name: "4인용 원목 다이닝 테이블 1400",
    thumbnail: "/images/products/dining-table-01.webp",
    brand: "한샘",
    price: 780000,
    originalPrice: 980000,
    discountRate: 20,
    rating: 4.8,
    reviewCount: 97,
    badge: { text: "다이닝 인기 1위", bgColor: "#3a3a3a" },
    category: ["다이닝", "테이블"],
  },
  {
    id: "p3002",
    familyId: "p3002",
    name: "패브릭 다이닝 체어 (1개)",
    thumbnail: "/images/products/dining-chair-01.webp",
    brand: "한샘",
    price: 129000,
    originalPrice: 168000,
    discountRate: 23,
    rating: 4.6,
    reviewCount: 142,
    category: ["다이닝", "체어"],
    colors: ["#f5f0e8", "#3a3a3a", "#8a7c6a"],
  },
  {
    id: "p3003",
    familyId: "p3003",
    name: "펜던트 다이닝 조명",
    thumbnail: "/images/products/pendant-light-01.webp",
    brand: "한샘",
    price: 168000,
    originalPrice: 228000,
    discountRate: 26,
    rating: 4.4,
    reviewCount: 39,
    category: ["다이닝", "조명"],
  },
  {
    id: "p3004",
    familyId: "p3004",
    name: "다이닝 수납장 800",
    thumbnail: "/images/products/cabinet-01.webp",
    brand: "한샘",
    price: 395000,
    originalPrice: 530000,
    discountRate: 25,
    rating: 4.5,
    reviewCount: 58,
    category: ["다이닝", "수납"],
    colors: ["#f5f0e8", "#3a3a3a"],
  },
  {
    id: "p3005",
    familyId: "p3005",
    name: "테이블 매트 세트 (4개입)",
    thumbnail: "/images/products/placemat-set-01.webp",
    brand: "한샘",
    price: 32000,
    originalPrice: 38000,
    discountRate: 16,
    rating: 4.2,
    reviewCount: 22,
    category: ["다이닝", "소품"],
  },
  {
    id: "p3006",
    familyId: "p3006",
    name: "다이닝 2인용 벤치 1200",
    thumbnail: "/images/products/bench-01.webp",
    brand: "한샘",
    price: 245000,
    originalPrice: 318000,
    discountRate: 23,
    rating: 4.6,
    reviewCount: 44,
    category: ["다이닝", "체어"],
    colors: ["#f5f0e8", "#3a3a3a"],
  },
];

// 특정 familyId에 속하는 모든 상품 (sibling picker용)
export function getSiblings(familyId: string): ProductSummary[] {
  return catalog.filter((p) => p.familyId === familyId);
}

// 카테고리 필터 (categoryTags도 포함해 검색)
export function getByCategory(cat: string, limit?: number): ProductSummary[] {
  const result = catalog.filter(
    (p) => p.category.includes(cat) || p.categoryTags?.includes(cat)
  );
  return limit ? result.slice(0, limit) : result;
}

// ID로 단건 조회
export function getProductById(id: string): ProductSummary {
  const p = catalog.find((p) => p.id === id);
  if (!p) throw new Error(`Product not found: ${id}`);
  return p;
}

// 베스트셀러 (reviewCount 내림차순)
export function getBestSellers(limit = 8): ProductSummary[] {
  return [...catalog]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
