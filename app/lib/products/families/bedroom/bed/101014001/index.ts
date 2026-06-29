import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const steadyCompyFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "침대", "저상형·패밀리침대"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "사전판매 (결제 후 순차 배송)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
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

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? steadyCompyFamily.sharedImages[0];
}

const variantDetails: Record<string, VariantData> = {
  "1010140010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1010140010/1010140010-main-01.webp`,
    ],
    filterAttributes: { size: ["SS"], config: ["침대"] },
    sections: createSections(),
  },
  "1010140011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1010140011/1010140011-main-01.webp`,
    ],
    filterAttributes: { size: ["SS"], config: ["침대"] },
    sections: createSections(),
  },
  "1010140012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1010140012/1010140012-main-01.webp`,
    ],
    filterAttributes: { size: ["SS"], config: ["침대"], feature: ["낙상방지가드"] },
    sections: createSections(),
  },
};

export const summaries: ProductSummary[] = [
  {
    id: "1010140010",
    familyId: "steady-compy-family-bed",
    name: "스테디 컴피 패밀리침대 SS 일반형 (매트별도)",
    variantLabel: "일반형",
    thumbnail: thumbnailFor("1010140010"),
    brand: "한샘",
    price: 489000,
    originalPrice: 584000,
    discountRate: 16,
    rating: 4.7,
    reviewCount: 32,
    category: ["침실", "침대", "저상형·패밀리침대"],
    filterAttributes: { size: ["SS"], config: ["침대"] },
  },
  {
    id: "1010140011",
    familyId: "steady-compy-family-bed",
    name: "스테디 컴피 패밀리침대 SS 와이드헤드형 (매트별도)",
    variantLabel: "와이드헤드형",
    thumbnail: thumbnailFor("1010140011"),
    brand: "한샘",
    price: 609020,
    originalPrice: 823000,
    discountRate: 26,
    rating: 4.7,
    reviewCount: 32,
    category: ["침실", "침대", "저상형·패밀리침대"],
    filterAttributes: { size: ["SS"], config: ["침대"] },
  },
  {
    id: "1010140012",
    familyId: "steady-compy-family-bed",
    name: "스테디 컴피 패밀리침대 SS 가드형 (매트별도)",
    variantLabel: "가드형",
    thumbnail: thumbnailFor("1010140012"),
    brand: "한샘",
    price: 794640,
    originalPrice: 903000,
    discountRate: 12,
    rating: 4.7,
    reviewCount: 32,
    category: ["침실", "침대", "저상형·패밀리침대"],
    filterAttributes: { size: ["SS"], config: ["침대"], feature: ["낙상방지가드"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`steady-compy-family-bed SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`steady-compy-family-bed variant data missing: ${id}`);
  return {
    ...summary,
    ...steadyCompyFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
