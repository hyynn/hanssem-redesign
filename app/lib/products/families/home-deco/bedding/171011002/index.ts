import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const sleepdiverPillowFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "침구", "베개솜·베개커버"],
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
  "1710110020": {
    variantImages: [],
    filterAttributes: { config: ["2P세트"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? sleepdiverPillowFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: sleepdiverPillowFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1710110020",
    familyId: "sleepdiver-cervical-pillow",
    name: "슬립다이버 마이크로 경추 베개솜 2P SET",
    thumbnail: thumbnailFor("1710110020"),
    hoverImage: hoverImageFor("1710110020"),
    brand: "한샘",
    price: 21900,
    originalPrice: 33000,
    rating: 4.5,
    reviewCount: 11,
    salesCount: 170,
    category: ["소품", "침구", "베개솜·베개커버"],
    filterAttributes: { config: ["2P세트"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`sleepdiver-cervical-pillow SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`sleepdiver-cervical-pillow variant data missing: ${id}`);
  return {
    ...summary,
    ...sleepdiverPillowFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
