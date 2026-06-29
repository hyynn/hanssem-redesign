import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const pleatsCabinetFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "거실장"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1111100030": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1111100030/1111100030-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1111100030/1111100030-variant-02.webp`,
    ],
    filterAttributes: {},
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? pleatsCabinetFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1111100030",
    familyId: "pleats-cabinet",
    name: "플리츠 거실장 210cm",
    thumbnail: thumbnailFor("1111100030"),
    brand: "한샘",
    price: 669000,
    originalPrice: 850000,
    discountRate: 21,
    rating: 4.8,
    reviewCount: 47,
    badge: { text: "거실수납 3위", bgColor: "#3a3a3a" },
    category: ["거실", "거실장"],
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`pleats-cabinet SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`pleats-cabinet variant data missing: ${id}`);
  return {
    ...summary,
    ...pleatsCabinetFamily,
    familyId: "pleats-cabinet",
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
