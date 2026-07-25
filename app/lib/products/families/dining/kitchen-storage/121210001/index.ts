import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const modiPantryCabinetFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "주방수납장", "주방수납장"],
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-08.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1212100010": {
    variantImages: [],
    filterAttributes: { size: ["60cm"], config: ["팬트리장"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? modiPantryCabinetFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: modiPantryCabinetFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1212100010",
    familyId: "modi-pantry-cabinet",
    name: "모디 주방수납 팬트리장 60cm",
    thumbnail: thumbnailFor("1212100010"),
    hoverImage: hoverImageFor("1212100010"),
    brand: "한샘",
    price: 333840,
    originalPrice: 428000,
    rating: 4.8,
    reviewCount: 31,
    salesCount: 210,
    category: ["다이닝", "주방수납장", "주방수납장"],
    colors: ["화이트", "메이플"],
    priceOptionGroups: [
      {
        id: "type",
        label: "타입 선택",
        options: [
          { id: "basic", label: "일반형", priceDelta: 0 },
          { id: "premium-left", label: "고급형-좌형", priceDelta: 117000 },
          { id: "premium-right", label: "고급형-우형", priceDelta: 117000 },
        ],
      },
    ],
    filterAttributes: { size: ["60cm"], config: ["팬트리장"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`modi-pantry-cabinet SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`modi-pantry-cabinet variant data missing: ${id}`);
  return {
    ...summary,
    ...modiPantryCabinetFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
