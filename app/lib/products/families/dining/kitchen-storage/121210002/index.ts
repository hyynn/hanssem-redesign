import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createLowerCabinetSections, createCafeApplianceSections, createCafeStorageSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const modiCafeCabinetSeriesFamily: Omit<ProductFamily, "familyId"> = {
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1212100020": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-05.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-06.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-07.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-08.webp`,
      `/images/products/${FAMILY_PATH}/1212100020/1212100020-main-09.webp`,
    ],
    filterAttributes: { size: ["100cm"], config: ["하부장"] },
    sections: createLowerCabinetSections(),
  },
  "1212100021": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-05.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-06.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-07.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-08.webp`,
      `/images/products/${FAMILY_PATH}/1212100021/1212100021-main-09.webp`,
    ],
    filterAttributes: { size: ["100cm"], config: ["가전형"] },
    sections: createCafeApplianceSections(),
  },
  "1212100022": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-05.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-06.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-07.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-08.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-09.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-10.webp`,
      `/images/products/${FAMILY_PATH}/1212100022/1212100022-main-11.webp`,
    ],
    filterAttributes: { size: ["100cm"], config: ["수납형"] },
    sections: createCafeStorageSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? modiCafeCabinetSeriesFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: modiCafeCabinetSeriesFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1212100020",
    familyId: "modi-cafe-cabinet-series",
    name: "모디 주방수납 하부장 100cm 수납형",
    variantLabel: "하부장 수납형",
    thumbnail: thumbnailFor("1212100020"),
    hoverImage: hoverImageFor("1212100020"),
    brand: "한샘",
    price: 349920,
    originalPrice: 432000,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 190,
    category: ["다이닝", "주방수납장", "주방수납장"],
    colors: ["화이트", "메이플"],
    priceOptionGroups: [
      {
        id: "door",
        label: "도어 타입",
        options: [
          { id: "basic", label: "일반도어", priceDelta: 0 },
          { id: "glass", label: "유리도어", priceDelta: 74000 },
        ],
      },
    ],
    filterAttributes: { size: ["100cm"], config: ["하부장"] },
  },
  {
    id: "1212100021",
    familyId: "modi-cafe-cabinet-series",
    name: "모디 주방수납 카페장 100cm 가전형",
    variantLabel: "카페장 가전형",
    thumbnail: thumbnailFor("1212100021"),
    hoverImage: hoverImageFor("1212100021"),
    brand: "한샘",
    price: 441210,
    originalPrice: 573000,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 140,
    category: ["다이닝", "주방수납장", "주방수납장"],
    colors: ["화이트", "메이플"],
    priceOptionGroups: [
      {
        id: "upper",
        label: "상부장 타입",
        options: [
          { id: "shelf", label: "선반형", priceDelta: 0 },
          { id: "open", label: "오픈형", priceDelta: 84000 },
          { id: "sliding", label: "슬라이딩형", priceDelta: 158000 },
        ],
      },
    ],
    filterAttributes: { size: ["100cm"], config: ["가전형"] },
  },
  {
    id: "1212100022",
    familyId: "modi-cafe-cabinet-series",
    name: "모디 주방수납 카페장 100cm 수납형",
    variantLabel: "카페장 수납형",
    thumbnail: thumbnailFor("1212100022"),
    hoverImage: hoverImageFor("1212100022"),
    brand: "한샘",
    price: 468220,
    originalPrice: 571000,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 80,
    category: ["다이닝", "주방수납장", "주방수납장"],
    colors: ["화이트", "메이플"],
    priceOptionGroups: [
      {
        id: "upper",
        label: "상부장 타입",
        options: [
          { id: "shelf", label: "선반형", priceDelta: 0 },
          { id: "open", label: "오픈형", priceDelta: 84000 },
          { id: "sliding", label: "슬라이딩형", priceDelta: 158000 },
        ],
      },
      {
        id: "lower",
        label: "하부장 타입",
        options: [
          { id: "basic", label: "일반도어", priceDelta: 0 },
          { id: "glass", label: "유리도어", priceDelta: 74000 },
        ],
      },
    ],
    filterAttributes: { size: ["100cm"], config: ["수납형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`modi-cafe-cabinet-series SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`modi-cafe-cabinet-series variant data missing: ${id}`);
  return {
    ...summary,
    ...modiCafeCabinetSeriesFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
