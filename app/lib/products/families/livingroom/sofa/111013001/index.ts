import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const hyuModeSofaFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "소파", "좌식소파"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "택배 배송",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
  sharedImages: [
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-01.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-02.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-03.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-04.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-05.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-06.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-07.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1110130010": {
    variantImages: [],
    filterAttributes: { config: ["소파베드"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? hyuModeSofaFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: hyuModeSofaFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1110130010",
    familyId: "hyu-mode-sofa",
    name: "휴 모드 좌식 소파베드 아이보리",
    thumbnail: thumbnailFor("1110130010"),
    hoverImage: hoverImageFor("1110130010"),
    brand: "한샘",
    price: 159000,
    originalPrice: 190000,
    discountRate: 16,
    rating: 4.7,
    reviewCount: 8,
    salesCount: 75,
    category: ["거실", "소파", "좌식소파"],
    categoryTags: ["소파베드"],
    filterAttributes: { config: ["소파베드"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`hyu-mode-sofa SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`hyu-mode-sofa variant data missing: ${id}`);
  return {
    ...summary,
    ...hyuModeSofaFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
