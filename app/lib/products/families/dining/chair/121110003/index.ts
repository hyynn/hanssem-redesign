import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const widRoundDiningChairFamily: Omit<ProductFamily, "familyId"> = {
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
  "1211100030": {
    variantImages: [],
    filterAttributes: { config: ["2개입"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? widRoundDiningChairFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: widRoundDiningChairFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211100030",
    familyId: "wid-round-dining-chair",
    name: "위드 라운드 식탁의자 (2개입)",
    thumbnail: thumbnailFor("1211100030"),
    hoverImage: hoverImageFor("1211100030"),
    brand: "한샘",
    price: 212000,
    originalPrice: 245000,
    rating: 4.9,
    reviewCount: 22,
    salesCount: 290,
    badge: { text: "식탁의자 판매 1위", bgColor: "#FE5A5D" },
    category: ["다이닝", "의자", "식탁의자"],
    colors: ["부클아이보리", "코튼화이트"],
    filterAttributes: { config: ["2개입"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`wid-round-dining-chair SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`wid-round-dining-chair variant data missing: ${id}`);
  return {
    ...summary,
    ...widRoundDiningChairFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
