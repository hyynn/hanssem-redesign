import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const shinyLunaBlindFamily: Omit<ProductFamily, "familyId"> = {
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1712110010": {
    variantImages: [],
    filterAttributes: { config: ["맞춤제작"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? shinyLunaBlindFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: shinyLunaBlindFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1712110010",
    familyId: "black-label-shiny-luna-blind",
    name: "BLACK LABEL 샤이니 루나 콤비 블라인드 (4컬러)",
    thumbnail: thumbnailFor("1712110010"),
    hoverImage: hoverImageFor("1712110010"),
    brand: "한샘",
    price: 299000,
    originalPrice: 460000,
    rating: 4.7,
    reviewCount: 11,
    salesCount: 260,
    category: ["소품", "커튼·블라인드", "블라인드"],
    colors: ["실버화이트", "어반베이지", "내추럴베이지", "라이트그레이"],
    filterAttributes: { config: ["맞춤제작"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`black-label-shiny-luna-blind SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`black-label-shiny-luna-blind variant data missing: ${id}`);
  return {
    ...summary,
    ...shinyLunaBlindFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
