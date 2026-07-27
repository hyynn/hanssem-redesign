import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const modalAllergySetFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "침구", "침구세트"],
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
  "1710120020": {
    variantImages: [],
    filterAttributes: { size: ["SS", "Q", "K"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? modalAllergySetFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: modalAllergySetFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1710120020",
    familyId: "modal-allergy-care-set",
    name: "마이크로 모달 알러지케어 차렵이불세트 (SS/Q/K)",
    thumbnail: thumbnailFor("1710120020"),
    hoverImage: hoverImageFor("1710120020"),
    brand: "한샘",
    price: 49900,
    originalPrice: 75000,
    rating: 4.8,
    reviewCount: 21,
    salesCount: 280,
    badge: { text: "침구세트 판매 2위", bgColor: "#FE5A5D" },
    category: ["소품", "침구", "침구세트"],
    categoryTags: ["이불솜·이불커버"],
    filterAttributes: { size: ["SS", "Q", "K"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`modal-allergy-care-set SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`modal-allergy-care-set variant data missing: ${id}`);
  return {
    ...summary,
    ...modalAllergySetFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
