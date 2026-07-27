import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const sokSlidingBoxFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "주방수납", "수납용품"],
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
  "1711100010": {
    variantImages: [],
    filterAttributes: { config: ["단품"] },
    sections: createSections(),
  },
  "1711100011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1711100011/1711100011-main-01.webp`,
    ],
    filterAttributes: { config: ["1+1"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? sokSlidingBoxFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: sokSlidingBoxFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1711100010",
    familyId: "sok-sliding-box-drawer",
    name: "S.O.K 슬라이딩박스 서랍 수납함",
    thumbnail: thumbnailFor("1711100010"),
    hoverImage: hoverImageFor("1711100010"),
    brand: "한샘",
    price: 39900,
    originalPrice: 57900,
    rating: 4.6,
    reviewCount: 23,
    salesCount: 210,
    category: ["소품", "주방수납", "수납용품"],
    categoryTags: ["주방정리"],
    colors: ["화이트", "베이지"],
    priceOptionGroups: [
      {
        id: "size",
        label: "사이즈 선택",
        options: [
          { id: "m", label: "M", priceDelta: 0 },
          { id: "l", label: "L", priceDelta: 6000 },
        ],
      },
    ],
    filterAttributes: { config: ["단품"] },
  },
  {
    id: "1711100011",
    familyId: "sok-sliding-box-drawer",
    name: "S.O.K 슬라이딩박스 서랍 수납함 1+1",
    thumbnail: thumbnailFor("1711100011"),
    hoverImage: hoverImageFor("1711100011"),
    brand: "한샘",
    price: 69900,
    originalPrice: 115800,
    rating: 4.6,
    reviewCount: 23,
    salesCount: 260,
    badge: { text: "수납용품 판매 1위", bgColor: "#FE5A5D" },
    category: ["소품", "주방수납", "수납용품"],
    categoryTags: ["주방정리"],
    colors: ["화이트", "베이지"],
    priceOptionGroups: [
      {
        id: "size",
        label: "사이즈 선택",
        options: [
          { id: "m", label: "M", priceDelta: 0 },
          { id: "l", label: "L", priceDelta: 10000 },
        ],
      },
    ],
    filterAttributes: { config: ["1+1"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`sok-sliding-box-drawer SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`sok-sliding-box-drawer variant data missing: ${id}`);
  return {
    ...summary,
    ...sokSlidingBoxFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
