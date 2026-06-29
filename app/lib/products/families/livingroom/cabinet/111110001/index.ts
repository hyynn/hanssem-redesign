import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const clintUrbanCabinetFamily: Omit<ProductFamily, "familyId"> = {
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
  "1111100010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1111100010/1111100010-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100010/1111100010-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100010/1111100010-variant-02.webp`,
    ],
    filterAttributes: { config: ["일반형"] },
    sections: createSections(),
  },
  "1111100011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1111100011/1111100011-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100011/1111100011-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100011/1111100011-variant-02.webp`,
    ],
    filterAttributes: { config: ["다릿발형"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? clintUrbanCabinetFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1111100010",
    familyId: "clint-urban-cabinet",
    name: "클린트 어반 180cm 거실장 일반형 (3종 택1)",
    variantLabel: "일반형",
    thumbnail: thumbnailFor("1111100010"),
    brand: "한샘",
    price: 314000,
    originalPrice: 374000,
    discountRate: 16,
    rating: 4.7,
    reviewCount: 37,
    colors: ["화이트", "머드베이지", "그린"],
    category: ["거실", "거실장"],
    filterAttributes: { config: ["일반형"] },
  },
  {
    id: "1111100011",
    familyId: "clint-urban-cabinet",
    name: "클린트 어반 180cm 거실장 다릿발형 (3종 택1)",
    variantLabel: "다릿발형",
    thumbnail: thumbnailFor("1111100011"),
    brand: "한샘",
    price: 344000,
    originalPrice: 421000,
    discountRate: 18,
    rating: 4.7,
    reviewCount: 37,
    colors: ["화이트", "머드베이지", "그린"],
    category: ["거실", "거실장"],
    filterAttributes: { config: ["다릿발형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`clint-urban-cabinet SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`clint-urban-cabinet variant data missing: ${id}`);
  return {
    ...summary,
    ...clintUrbanCabinetFamily,
    familyId: "clint-urban-cabinet",
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
