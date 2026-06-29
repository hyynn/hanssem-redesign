import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const hyuLoungeReclinerlFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "소파", "좌식소파"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1110130020": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110130020/1110130020-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1110130020/1110130020-variant-02.webp`,
    ],
    filterAttributes: { feature: ["회전형", "리클라이너"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? hyuLoungeReclinerlFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1110130020",
    familyId: "hyu-lounge-recliner",
    name: "휴 회전형 라운지 좌식리클라이너 아이보리(쿠션 미포함)",
    thumbnail: thumbnailFor("1110130020"),
    brand: "한샘",
    price: 199000,
    originalPrice: 280000,
    discountRate: 29,
    rating: 4.8,
    reviewCount: 2,
    category: ["거실", "소파", "좌식소파"],
    categoryTags: ["리클라이너"],
    filterAttributes: { feature: ["회전형", "리클라이너"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`hyu-lounge-recliner SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`hyu-lounge-recliner variant data missing: ${id}`);
  return {
    ...summary,
    ...hyuLoungeReclinerlFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
