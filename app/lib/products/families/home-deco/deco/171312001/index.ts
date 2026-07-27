import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const moonJarDiffuserFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "인테리어소품", "데코소품"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1713120010": {
    variantImages: [],
    filterAttributes: { config: ["세트"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? moonJarDiffuserFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: moonJarDiffuserFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713120010",
    familyId: "moon-jar-diatomite-diffuser",
    name: "달항아리 규조토 디퓨저 세트",
    thumbnail: thumbnailFor("1713120010"),
    hoverImage: hoverImageFor("1713120010"),
    brand: "한샘",
    price: 13900,
    originalPrice: 39000,
    rating: 4.5,
    reviewCount: 13,
    salesCount: 150,
    category: ["소품", "인테리어소품", "데코소품"],
    filterAttributes: { config: ["세트"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`moon-jar-diatomite-diffuser SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`moon-jar-diatomite-diffuser variant data missing: ${id}`);
  return {
    ...summary,
    ...moonJarDiffuserFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
