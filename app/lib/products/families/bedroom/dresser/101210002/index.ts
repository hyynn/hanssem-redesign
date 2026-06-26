import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const monoChestFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "화장대·서랍장", "화장대·서랍장"],
  promotions: [
    { title: "6월 쌤위크", image: "/images/promotions/saemweek-2026-06.webp" },
    { title: "침실이벤트 리뷰", image: "/images/promotions/bedroom-event-review.webp" },
  ],
  deliveryInfo: {
    method: "사전판매 (결제 후 순차 배송)",
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
    id: "1012100020",
    familyId: "mono-chest",
    name: "호텔침대 모노 3단 서랍장 1000 화이트",
    variantLabel: "화이트",
    thumbnail: `/images/products/${FAMILY_PATH}/1012100020/1012100020-main-01.webp`,
    brand: "한샘",
    price: 369000,
    originalPrice: 454000,
    discountRate: 19,
    rating: 4.9,
    reviewCount: 20,
    category: ["침실", "화장대·서랍장", "화장대·서랍장"],
    categoryTags: ["서랍장"],
  },
  {
    id: "1012100021",
    familyId: "mono-chest",
    name: "호텔침대 모노 3단 서랍장 1000 차콜",
    variantLabel: "차콜",
    thumbnail: `/images/products/${FAMILY_PATH}/1012100021/1012100021-main-01.webp`,
    brand: "한샘",
    price: 369000,
    originalPrice: 454000,
    discountRate: 19,
    rating: 4.9,
    reviewCount: 20,
    category: ["침실", "화장대·서랍장", "화장대·서랍장"],
    categoryTags: ["서랍장"],
  },
];

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1012100020": {
    variantImages: [],
    filterAttributes: { config: ["화이트"] },
    sections: createSections(),
  },
  "1012100021": {
    variantImages: [],
    filterAttributes: { config: ["차콜"] },
    sections: createSections(),
  },
};

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mono-chest SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mono-chest variant data missing: ${id}`);
  return {
    ...summary,
    ...monoChestFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
