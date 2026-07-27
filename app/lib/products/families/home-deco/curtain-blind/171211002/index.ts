import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const doubleRollscreenFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "커튼·블라인드", "블라인드"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 시공팀)",
    region: "전국 (제주도 및 도서산간 지역 시공 불가)",
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
  "1712110020": {
    variantImages: [],
    filterAttributes: { feature: ["암막"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? doubleRollscreenFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: doubleRollscreenFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1712110020",
    familyId: "black-label-double-rollscreen",
    name: "BLACK LABEL 호텔식 더블 롤스크린 암막 블라인드",
    thumbnail: thumbnailFor("1712110020"),
    hoverImage: hoverImageFor("1712110020"),
    brand: "한샘",
    price: 369000,
    originalPrice: 520000,
    rating: 4.8,
    reviewCount: 12,
    salesCount: 210,
    category: ["소품", "커튼·블라인드", "블라인드"],
    filterAttributes: { feature: ["암막"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`black-label-double-rollscreen SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`black-label-double-rollscreen variant data missing: ${id}`);
  return {
    ...summary,
    ...doubleRollscreenFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
