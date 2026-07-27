import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const primeKnifeBoardRackFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "주방수납", "주방정리"],
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
  "1711120020": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? primeKnifeBoardRackFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: primeKnifeBoardRackFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1711120020",
    familyId: "prime-knife-board-rack",
    name: "프라임 칼도마 건조대 (2종/택1)",
    thumbnail: thumbnailFor("1711120020"),
    hoverImage: hoverImageFor("1711120020"),
    brand: "한샘",
    price: 29990,
    originalPrice: 32990,
    rating: 4.8,
    reviewCount: 19,
    salesCount: 230,
    category: ["소품", "주방수납", "주방정리"],
    colors: ["화이트", "블랙"],
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`prime-knife-board-rack SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`prime-knife-board-rack variant data missing: ${id}`);
  return {
    ...summary,
    ...primeKnifeBoardRackFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
