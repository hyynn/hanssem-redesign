import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const stayTopperFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "매트리스", "토퍼·하단매트리스"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "택배 배송",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
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
  "1011120010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011120010/1011120010-main-01.webp`,
    ],
    filterAttributes: { size: ["SS"] },
    sections: createSections(),
  },
  "1011120011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011120011/1011120011-main-01.webp`,
    ],
    filterAttributes: { size: ["Q"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? stayTopperFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1011120010",
    familyId: "stay-topper",
    name: "스테이 리버서블 메모리폼 토퍼 SS",
    variantLabel: "SS",
    thumbnail: thumbnailFor("1011120010"),
    brand: "한샘",
    price: 149000,
    originalPrice: 219000,
    discountRate: 32,
    rating: 4.8,
    reviewCount: 9,
    category: ["침실", "매트리스", "토퍼·하단매트리스"],
    filterAttributes: { size: ["SS"] },
  },
  {
    id: "1011120011",
    familyId: "stay-topper",
    name: "스테이 리버서블 메모리폼 토퍼 Q",
    variantLabel: "Q",
    thumbnail: thumbnailFor("1011120011"),
    brand: "한샘",
    price: 179000,
    originalPrice: 249000,
    discountRate: 28,
    rating: 4.8,
    reviewCount: 9,
    category: ["침실", "매트리스", "토퍼·하단매트리스"],
    filterAttributes: { size: ["Q"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`stay-topper SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`stay-topper variant data missing: ${id}`);
  return {
    ...summary,
    ...stayTopperFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
