import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const euroNightstandFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "화장대·서랍장", "협탁·침대패널"],
  promotions: [
    { title: "6월 쌤위크", image: "/images/promotions/saemweek-2026-06.webp" },
    { title: "침실이벤트 리뷰", image: "/images/promotions/bedroom-event-review.webp" },
  ],
  deliveryInfo: {
    method: "한샘배송 (전문 배송팀 설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
  sharedImages: [
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-01.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-02.webp`,
  ],
};

export const summaries: ProductSummary[] = [
  {
    id: "1012120010",
    familyId: "euro-nightstand",
    name: "유로 605 슬로우 스틸협탁브라운",
    variantLabel: "기본단품",
    thumbnail: `/images/products/${FAMILY_PATH}/1012120010/1012120010-main-01.webp`,
    brand: "한샘",
    price: 242000,
    originalPrice: 242000,
    discountRate: 0,
    rating: 5.0,
    reviewCount: 6,
    category: ["침실", "화장대·서랍장", "협탁·침대패널"],
  },
];

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1012120010": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
};

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`euro-nightstand SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`euro-nightstand variant data missing: ${id}`);
  return {
    ...summary,
    ...euroNightstandFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
