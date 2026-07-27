import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const clearGlassRiceContainerFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "주방수납", "밀폐·보관용기"],
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
  "1711110030": {
    variantImages: [],
    filterAttributes: { config: ["2종"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? clearGlassRiceContainerFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: clearGlassRiceContainerFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1711110030",
    familyId: "clear-glass-rice-container",
    name: "클리어 유리밥용기 3P 2종 (320ml/236ml)",
    thumbnail: thumbnailFor("1711110030"),
    hoverImage: hoverImageFor("1711110030"),
    brand: "한샘",
    price: 12900,
    originalPrice: 21000,
    rating: 4.1,
    reviewCount: 3,
    salesCount: 60,
    category: ["소품", "주방수납", "밀폐·보관용기"],
    priceOptionGroups: [
      {
        id: "capacity",
        label: "용량 선택",
        options: [
          { id: "236ml-3p", label: "236ml 3P", priceDelta: 0 },
          { id: "320ml-3p", label: "320ml 3P", priceDelta: 2000 },
        ],
      },
    ],
    filterAttributes: { config: ["2종"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`clear-glass-rice-container SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`clear-glass-rice-container variant data missing: ${id}`);
  return {
    ...summary,
    ...clearGlassRiceContainerFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
