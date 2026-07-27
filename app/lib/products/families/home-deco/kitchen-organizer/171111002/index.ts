import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const clearFoodContainerFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "주방수납", "밀폐·보관용기"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1711110020": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
  "1711110021": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? clearFoodContainerFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: clearFoodContainerFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1711110020",
    familyId: "clear-food-container",
    name: "클리어 푸드 컨테이너 건조식품용기 냉장고 정리 (6종/택1)",
    thumbnail: thumbnailFor("1711110020"),
    hoverImage: hoverImageFor("1711110020"),
    brand: "한샘",
    price: 3500,
    originalPrice: 5900,
    rating: 4.8,
    reviewCount: 14,
    salesCount: 320,
    badge: { text: "밀폐용기 판매 1위", bgColor: "#FE5A5D" },
    category: ["소품", "주방수납", "밀폐·보관용기"],
    priceOptionGroups: [
      {
        id: "capacity",
        label: "용량 선택",
        options: [
          { id: "basic-460", label: "기본형 460ml", priceDelta: 0 },
          { id: "basic-700", label: "기본형 700ml", priceDelta: 1000 },
          { id: "basic-1300", label: "기본형 1300ml", priceDelta: 2000 },
          { id: "basic-1800", label: "기본형 1800ml", priceDelta: 3000 },
          { id: "low-1500", label: "롱타입 1500ml", priceDelta: 3000 },
          { id: "low-2600", label: "롱타입 2600ml", priceDelta: 4000 },
        ],
      },
    ],
    filterAttributes: {},
  },
  {
    id: "1711110021",
    familyId: "clear-food-container",
    name: "클리어 푸드 컨테이너 건조식품용기 냉장고 정리세트 (4종/택1)",
    thumbnail: thumbnailFor("1711110021"),
    hoverImage: hoverImageFor("1711110021"),
    brand: "한샘",
    price: 13900,
    originalPrice: 20900,
    rating: 4.8,
    reviewCount: 14,
    salesCount: 260,
    category: ["소품", "주방수납", "밀폐·보관용기"],
    priceOptionGroups: [
      {
        id: "set",
        label: "세트 구성 선택",
        options: [
          { id: "homecafe", label: "홈카페팩 (460+700+1300)", priceDelta: 0 },
          { id: "pasta", label: "파스타팩 (1500+2600)", priceDelta: 1000 },
          { id: "kitchen-basic", label: "주방기본팩 (700+1300+1800)", priceDelta: 3000 },
          { id: "full", label: "풀패키지 (460+700+1300+1800+1500+2600)", priceDelta: 17000 },
        ],
      },
    ],
    filterAttributes: {},
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`clear-food-container SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`clear-food-container variant data missing: ${id}`);
  return {
    ...summary,
    ...clearFoodContainerFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
