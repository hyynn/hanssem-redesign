import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const ridoSofaFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "소파", "가죽소파"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 배송팀 설치 포함)",
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-07.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1110100010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110100010/1110100010-main-01.webp`,
    ],
    filterAttributes: { size: ["3인"] },
    sections: createSections(),
  },
  "1110100011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110100011/1110100011-main-01.webp`,
    ],
    filterAttributes: { size: ["4인"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? ridoSofaFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1110100010",
    familyId: "rido-sofa",
    name: "리도 천연가죽 소파 3인",
    variantLabel: "3인",
    thumbnail: thumbnailFor("1110100010"),
    brand: "한샘",
    price: 879000,
    originalPrice: 1100000,
    discountRate: 20,
    rating: 4.9,
    reviewCount: 41,
    category: ["거실", "소파", "가죽소파"],
    categoryTags: ["3인소파"],
    colors: ["크림화이트", "페더화이트"],
    filterAttributes: { size: ["3인"] },
  },
  {
    id: "1110100011",
    familyId: "rido-sofa",
    name: "리도 천연가죽 소파 4인",
    variantLabel: "4인",
    thumbnail: thumbnailFor("1110100011"),
    brand: "한샘",
    price: 1229000,
    originalPrice: 1543000,
    discountRate: 20,
    rating: 4.9,
    reviewCount: 41,
    category: ["거실", "소파", "가죽소파"],
    categoryTags: ["4인소파"],
    colors: ["크림화이트", "페더화이트"],
    filterAttributes: { size: ["4인"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`rido-sofa SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`rido-sofa variant data missing: ${id}`);
  return {
    ...summary,
    ...ridoSofaFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
