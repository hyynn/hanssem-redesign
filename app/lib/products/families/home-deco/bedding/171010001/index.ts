import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const polandGooseFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "침구", "이불솜·이불커버"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "택배배송 (CJ대한통운)",
    region: "전국 (제주도 및 도서산간 지역 추가 배송비 발생)",
  },
  deliveryGuides,
  notices,
  sharedImages: [
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-01.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-02.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-03.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-04.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-05.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1710100010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1710100010/1710100010-main-01.webp`,
    ],
    filterAttributes: { config: ["베개솜"] },
    sections: createSections("베개솜"),
  },
  "1710100011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1710100011/1710100011-main-01.webp`,
    ],
    filterAttributes: { config: ["이불솜"] },
    sections: createSections("이불솜"),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? polandGooseFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: polandGooseFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1710100010",
    familyId: "original-poland-goose",
    name: "오리지널 사계절 폴란드 구스 베개솜",
    variantLabel: "베개솜",
    thumbnail: thumbnailFor("1710100010"),
    hoverImage: hoverImageFor("1710100010"),
    brand: "한샘",
    price: 299000,
    originalPrice: 640000,
    rating: 4.8,
    reviewCount: 26,
    salesCount: 90,
    category: ["소품", "침구", "베개솜·베개커버"],
    filterAttributes: { config: ["베개솜"] },
  },
  {
    id: "1710100011",
    familyId: "original-poland-goose",
    name: "오리지널 사계절 폴란드 구스 이불솜",
    variantLabel: "이불솜",
    thumbnail: thumbnailFor("1710100011"),
    hoverImage: hoverImageFor("1710100011"),
    brand: "한샘",
    price: 399000,
    originalPrice: 820000,
    rating: 4.8,
    reviewCount: 26,
    salesCount: 120,
    category: ["소품", "침구", "이불솜·이불커버"],
    filterAttributes: { config: ["이불솜"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`original-poland-goose SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`original-poland-goose variant data missing: ${id}`);
  return {
    ...summary,
    ...polandGooseFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
