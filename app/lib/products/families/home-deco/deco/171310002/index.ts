import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const oliviaLampFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "인테리어소품", "조명"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1713100020": {
    variantImages: [],
    filterAttributes: { config: ["테이블+플로어"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? oliviaLampFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: oliviaLampFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713100020",
    familyId: "olivia-lamp-set",
    name: "올리비아 램프 세트 (테이블+플로어)",
    thumbnail: thumbnailFor("1713100020"),
    hoverImage: hoverImageFor("1713100020"),
    brand: "한샘",
    price: 165900,
    originalPrice: 349000,
    rating: 4.8,
    reviewCount: 14,
    salesCount: 220,
    category: ["소품", "인테리어소품", "조명"],
    filterAttributes: { config: ["테이블+플로어"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`olivia-lamp-set SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`olivia-lamp-set variant data missing: ${id}`);
  return {
    ...summary,
    ...oliviaLampFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
