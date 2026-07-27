import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const leatherTissueCoverFamily: Omit<ProductFamily, "familyId"> = {
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-04.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1713120030": {
    variantImages: [],
    filterAttributes: { config: ["3종 택1"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? leatherTissueCoverFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: leatherTissueCoverFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713120030",
    familyId: "leather-pattern-hotel-tissue-cover",
    name: "가죽패턴 호텔 티슈커버 (3종 택1)",
    thumbnail: thumbnailFor("1713120030"),
    hoverImage: hoverImageFor("1713120030"),
    brand: "한샘",
    price: 3900,
    originalPrice: 11900,
    rating: 4.9,
    reviewCount: 31,
    salesCount: 410,
    category: ["소품", "인테리어소품", "데코소품"],
    colors: ["베이지", "아이보리", "그레이"],
    filterAttributes: { config: ["3종 택1"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`leather-pattern-hotel-tissue-cover SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`leather-pattern-hotel-tissue-cover variant data missing: ${id}`);
  return {
    ...summary,
    ...leatherTissueCoverFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
