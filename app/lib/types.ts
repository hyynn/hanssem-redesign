// ─── Catalog / Card ───────────────────────────────────────────────────────────
export interface ProductSummary {
  id: string;
  familyId: string;
  name: string;
  variantLabel?: string;   // short label for sibling picker
  thumbnail: string;
  hoverImage?: string;  // gallery 2번째 이미지 — 카드 hover 시 thumbnail과 크로스페이드
  brand: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  salesCount: number;      // 월간 판매량 (이달의 베스트셀러 정렬 기준, DB 부재로 수기 입력)
  badge?: { text: string; bgColor: string };
  category: string[];      // for filtering: ["침실", "침대", "호텔침대"]
  categoryTags?: string[]; // extra subcategory memberships: ["수납침대", "Q/K침대"]
  colors?: string[];       // optional color swatches
  filterAttributes?: FilterAttributes;
}

// ─── Family (shared across variants) ─────────────────────────────────────────
export interface ProductFamily {
  familyId: string;
  breadcrumb: string[];
  promotions: { title: string; image: string }[];
  deliveryInfo: { method: string; region: string };
  deliveryGuides: DeliveryGuideGroup[];
  sharedImages: string[];   // gallery images shared by all siblings
}

// ─── Filter attributes (size/config/feature — style axis derived from product code) ──
export interface FilterAttributes {
  size?: string[];     // 예: ["Q/K"], ["KK"]
  config?: string[];   // 예: ["침대"], ["침대+매트"]
  feature?: string[];  // 예: ["조명리모컨형"]
}

// ─── Detail page (Summary + Family + variant-specific) ────────────────────────
export interface ProductDetail extends ProductSummary, ProductFamily {
  // gallery = [thumbnail, ...sharedImages, ...variantImages]
  variantImages: string[];  // images unique to this SKU (size diagram, add-on photos, etc.)
  filterAttributes?: FilterAttributes;
  siblings: ProductSummary[];
  sections: ProductDetailSection[];
  reviews: ReviewData;
  qnaItems: QnaItem[];
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  optionLabel?: string;  // 색상명·variantLabel 등 옵션 식별자
}

// ─── Detail content blocks ────────────────────────────────────────────────────
export type DetailBlock =
  | { type: "text"; title: string; body: string }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; alt: string };

export interface ProductDetailSection {
  id: string;
  label: string;
  blocks: DetailBlock[];
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  variant: string;
  content: string;
  images?: string[];
}

export interface ReviewData {
  rating: number;
  count: number;
  distribution: { stars: number; count: number }[];
  items: Review[];
}

// ─── Q&A ──────────────────────────────────────────────────────────────────────
export type QnaCategory = "상품" | "배송" | "기타";

export interface QnaItem {
  id: string;
  category: QnaCategory;
  question: string;
  questioner: string;
  date: string;
  answered: boolean;
  answer?: string;
  answerDate?: string;
}

// ─── Delivery guide ───────────────────────────────────────────────────────────
export interface DeliveryGuideRow {
  label: string;
  value: string;
}

export interface DeliveryGuideGroup {
  title: string;
  rows: DeliveryGuideRow[];
}

// ─── Gallery assembly helper (single source of truth for image order) ─────────
// Order: variant "main-*" images first, then shared family images, then variant "variant-*" images.
// thumbnail is NOT included here — it's always gallery[0] (first main image, or sharedImages[0] fallback).
export function assembleGallery(
  product: Pick<ProductDetail, "sharedImages" | "variantImages">
): string[] {
  const mainImages = product.variantImages.filter((src) => src.includes("-main-"));
  const variantOnlyImages = product.variantImages.filter((src) => !src.includes("-main-"));
  return [...mainImages, ...product.sharedImages, ...variantOnlyImages];
}
