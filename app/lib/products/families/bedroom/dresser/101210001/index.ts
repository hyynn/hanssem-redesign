import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const monoDresserFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "화장대", "화장대·서랍장"],
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-07.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-08.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-09.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-10.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-11.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1012100010": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? monoDresserFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1012100010",
    familyId: "mono-dresser",
    name: "호텔침대 모노 화장대 800 (색상2종)",
    thumbnail: thumbnailFor("1012100010"),
    brand: "한샘",
    price: 289000,
    originalPrice: 358000,
    discountRate: 19,
    rating: 5.0,
    reviewCount: 5,
    category: ["침실", "화장대"],
    colors: ["차콜", "화이트"],
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mono-dresser SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mono-dresser variant data missing: ${id}`);
  return {
    ...summary,
    ...monoDresserFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
