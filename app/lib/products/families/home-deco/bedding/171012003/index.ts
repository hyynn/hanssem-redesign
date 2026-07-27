import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const foseasonTencelSetFamily: Omit<ProductFamily, "familyId"> = {
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
  "1710120030": {
    variantImages: [],
    filterAttributes: { size: ["SS", "Q", "K"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? foseasonTencelSetFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: foseasonTencelSetFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1710120030",
    familyId: "foseason-reversible-tencel-set",
    name: "포시즌 리버서블 텐셀 모달 차렵이불세트 (SS/Q/K)",
    thumbnail: thumbnailFor("1710120030"),
    hoverImage: hoverImageFor("1710120030"),
    brand: "한샘",
    price: 49900,
    originalPrice: 129000,
    rating: 4.8,
    reviewCount: 12,
    salesCount: 190,
    category: ["소품", "침구", "침구세트"],
    categoryTags: ["이불솜·이불커버"],
    filterAttributes: { size: ["SS", "Q", "K"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`foseason-reversible-tencel-set SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`foseason-reversible-tencel-set variant data missing: ${id}`);
  return {
    ...summary,
    ...foseasonTencelSetFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
