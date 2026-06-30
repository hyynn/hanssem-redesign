import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const comfortBaseFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "매트리스", "토퍼·하단매트리스"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 배송팀)",
    region: "전국 (제주/도서 지역 배송 불가)",
  },
  deliveryGuides,
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
  "1011120020": {
    variantImages: [],
    filterAttributes: { size: ["SS"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? comfortBaseFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: comfortBaseFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1011120020",
    familyId: "comfort-base",
    name: "컴포트 하단 매트리스 SS (매트별도)",
    thumbnail: thumbnailFor("1011120020"),
    hoverImage: hoverImageFor("1011120020"),
    brand: "한샘",
    price: 239000,
    originalPrice: 282000,
    discountRate: 15,
    rating: 4.8,
    reviewCount: 8,
    salesCount: 85,
    category: ["침실", "매트리스", "토퍼·하단매트리스"],
    filterAttributes: { size: ["SS"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`comfort-base SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`comfort-base variant data missing: ${id}`);
  return {
    ...summary,
    ...comfortBaseFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
