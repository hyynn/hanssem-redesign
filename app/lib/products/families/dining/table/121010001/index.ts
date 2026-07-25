import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const minaSteelSquareTableFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "식탁", "2인용식탁"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "한샘배송 (전문 배송팀 조립·설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
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
  "1210100010": {
    variantImages: [],
    filterAttributes: { size: ["2인용"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? minaSteelSquareTableFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: minaSteelSquareTableFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1210100010",
    familyId: "mina-steel-square-table",
    name: "미나 스틸 사각 2인 800 식탁",
    thumbnail: thumbnailFor("1210100010"),
    hoverImage: hoverImageFor("1210100010"),
    brand: "한샘",
    price: 230000,
    originalPrice: 297000,
    rating: 4.9,
    reviewCount: 21,
    salesCount: 180,
    badge: { text: "2인용 식탁 판매 1위", bgColor: "#FE5A5D" },
    category: ["다이닝", "식탁", "2인용식탁"],
    filterAttributes: { size: ["2인용"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mina-steel-square-table SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mina-steel-square-table variant data missing: ${id}`);
  return {
    ...summary,
    ...minaSteelSquareTableFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
