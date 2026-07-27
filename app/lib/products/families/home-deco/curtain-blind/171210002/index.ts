import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const cozyCurtainFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "커튼·블라인드", "커튼"],
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
  "1712100020": {
    variantImages: [],
    filterAttributes: { feature: ["빛조절"], config: ["맞춤제작"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? cozyCurtainFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: cozyCurtainFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1712100020",
    familyId: "natural-cozy-curtain",
    name: "내추럴 빛조절 코지 커튼 맞춤제작 가로폭 50cm (화이트/베이지)",
    thumbnail: thumbnailFor("1712100020"),
    hoverImage: hoverImageFor("1712100020"),
    brand: "한샘",
    price: 43900,
    originalPrice: 79000,
    rating: 4.8,
    reviewCount: 12,
    salesCount: 240,
    category: ["소품", "커튼·블라인드", "커튼"],
    colors: ["화이트", "베이지"],
    filterAttributes: { feature: ["빛조절"], config: ["맞춤제작"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`natural-cozy-curtain SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`natural-cozy-curtain variant data missing: ${id}`);
  return {
    ...summary,
    ...cozyCurtainFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
