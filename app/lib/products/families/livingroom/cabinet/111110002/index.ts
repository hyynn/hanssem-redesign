import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const clintModernCabinetFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "거실장"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 배송팀 설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
  sharedImages: [
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-01.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-02.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-03.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1111100020": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1111100020/1111100020-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100020/1111100020-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100020/1111100020-variant-02.webp`,
    ],
    filterAttributes: { config: ["일반형"] },
    sections: createSections(),
  },
  "1111100021": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1111100021/1111100021-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100021/1111100021-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100021/1111100021-variant-02.webp`,
    ],
    filterAttributes: { config: ["서랍형"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? clintModernCabinetFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1111100020",
    familyId: "clint-modern-cabinet",
    name: "클린트 모던 높은 거실장 200cm 일반형 수납장 (3종 택1)",
    variantLabel: "일반형 수납장",
    thumbnail: thumbnailFor("1111100020"),
    brand: "한샘",
    price: 438000,
    originalPrice: 500000,
    discountRate: 12,
    rating: 4.7,
    reviewCount: 27,
    colors: ["화이트", "그레이", "그린"],
    category: ["거실", "거실장"],
    categoryTags: ["수납장"],
    filterAttributes: { config: ["일반형"] },
  },
  {
    id: "1111100021",
    familyId: "clint-modern-cabinet",
    name: "클린트 모던 높은 거실장 200cm 서랍형 수납장 (3종 택1)",
    variantLabel: "서랍형 수납장",
    thumbnail: thumbnailFor("1111100021"),
    brand: "한샘",
    price: 478000,
    originalPrice: 543000,
    discountRate: 12,
    rating: 4.7,
    reviewCount: 27,
    colors: ["화이트", "그레이", "그린"],
    category: ["거실", "거실장"],
    categoryTags: ["수납장"],
    filterAttributes: { config: ["서랍형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`clint-modern-cabinet SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`clint-modern-cabinet variant data missing: ${id}`);
  return {
    ...summary,
    ...clintModernCabinetFamily,
    familyId: "clint-modern-cabinet",
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
