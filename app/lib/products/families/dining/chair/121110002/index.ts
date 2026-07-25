import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const minaRoundDiningChairFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "의자", "식탁의자"],
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-07.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1211100020": {
    variantImages: [],
    filterAttributes: { config: ["1개입"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? minaRoundDiningChairFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: minaRoundDiningChairFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211100020",
    familyId: "mina-round-dining-chair",
    name: "미나 라운드 식탁의자 (1개입)",
    thumbnail: thumbnailFor("1211100020"),
    hoverImage: hoverImageFor("1211100020"),
    brand: "한샘",
    price: 119000,
    originalPrice: 139000,
    rating: 4.8,
    reviewCount: 19,
    salesCount: 260,
    category: ["다이닝", "의자", "식탁의자"],
    colors: ["내추럴", "코튼화이트", "웜블랙", "러스트", "매트그린"],
    filterAttributes: { config: ["1개입"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mina-round-dining-chair SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mina-round-dining-chair variant data missing: ${id}`);
  return {
    ...summary,
    ...minaRoundDiningChairFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
