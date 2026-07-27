import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const modiRangeStandSeriesFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "주방수납장", "렌지대"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "한샘배송 (전문 배송팀 조립·설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
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
  "1212100030": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1212100030/1212100030-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1212100030/1212100030-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1212100030/1212100030-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1212100030/1212100030-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1212100030/1212100030-main-05.webp`,
    ],
    filterAttributes: { size: ["60cm"], config: ["렌지대"] },
    sections: createSections("1212100030"),
  },
  "1212100031": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1212100031/1212100031-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1212100031/1212100031-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1212100031/1212100031-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1212100031/1212100031-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1212100031/1212100031-main-05.webp`,
    ],
    filterAttributes: { size: ["85cm"], config: ["코너렌지대"] },
    sections: createSections("1212100031"),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? modiRangeStandSeriesFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: modiRangeStandSeriesFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1212100030",
    familyId: "modi-range-stand-series",
    name: "모디 주방수납 렌지대 60cm",
    variantLabel: "렌지대 60cm",
    thumbnail: thumbnailFor("1212100030"),
    hoverImage: hoverImageFor("1212100030"),
    brand: "한샘",
    price: 324000,
    originalPrice: 425000,
    rating: 4.8,
    reviewCount: 31,
    salesCount: 190,
    badge: { text: "렌지대 판매 1위", bgColor: "#FE5A5D" },
    category: ["다이닝", "주방수납장", "주방수납장"],
    categoryTags: ["렌지대"],
    colors: ["화이트", "메이플"],
    filterAttributes: { size: ["60cm"], config: ["렌지대"] },
  },
  {
    id: "1212100031",
    familyId: "modi-range-stand-series",
    name: "모디 주방수납 코너렌지대 85cm",
    variantLabel: "코너렌지대 85cm",
    thumbnail: thumbnailFor("1212100031"),
    hoverImage: hoverImageFor("1212100031"),
    brand: "한샘",
    price: 559000,
    originalPrice: 680000,
    rating: 4.8,
    reviewCount: 31,
    salesCount: 110,
    category: ["다이닝", "주방수납장", "주방수납장"],
    categoryTags: ["렌지대"],
    colors: ["화이트", "메이플"],
    filterAttributes: { size: ["85cm"], config: ["코너렌지대"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`modi-range-stand-series SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`modi-range-stand-series variant data missing: ${id}`);
  return {
    ...summary,
    ...modiRangeStandSeriesFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
