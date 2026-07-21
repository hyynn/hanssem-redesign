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
  rating: number;
  reviewCount: number;
  salesCount: number;      // 월간 판매량 (이달의 베스트셀러 정렬 기준, DB 부재로 수기 입력)
  badge?: { text: string; bgColor: string };
  category: string[];      // for filtering: ["침실", "침대", "호텔침대"]
  categoryTags?: string[]; // extra subcategory memberships: ["수납침대", "Q/K침대"]
  colors?: ColorOption[];  // optional color swatches — 원재료 차이로 가격이 다르면 객체 형태 사용
  priceOptionGroups?: PriceOptionGroup[]; // 색상 외 축(용량·세트 추가 등)의 유상 옵션
  filterAttributes?: FilterAttributes;
}

// ─── Priced options ───────────────────────────────────────────────────────────
// 무상 색상은 문자열, 원재료 차이로 가격이 달라지는 색상은 객체로 표기
export type ColorOption = string | { name: string; priceDelta: number };

export function colorName(c: ColorOption): string {
  return typeof c === "string" ? c : c.name;
}

export function colorPriceDelta(c: ColorOption): number {
  return typeof c === "string" ? 0 : c.priceDelta;
}

export interface PriceOption {
  id: string;
  label: string;       // "실속형", "라지 (35L)", "행거 세트 추가"
  priceDelta: number;  // 기준가 대비 추가금. options[0]은 항상 0(그룹 기본값)
}

export interface PriceOptionGroup {
  id: string;             // "capacity" | "set" 등, family별 자유
  label: string;          // "용량 선택", "세트 구성"
  options: PriceOption[]; // options[0] = 그룹 기본값
}

// ─── Family (shared across variants) ─────────────────────────────────────────
export interface ProductFamily {
  familyId: string;
  breadcrumb: string[];
  promotions: { title: string; image: string }[];
  deliveryInfo: { method: string; region: string };
  deliveryGuides: DeliveryGuideGroup[];
  notices: NoticeItem[];
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

// ─── Pre-purchase notice (구매전 필수 확인사항 / 상품 고시정보 / 교환·반품) ────
export interface NoticeItem {
  title: string;
  content: string;
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
