import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const moaSofaFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "소파", "패브릭소파"],
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

const variantDetails: Record<string, VariantData> = {
  "1110120010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110120010/1110120010-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120010/1110120010-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120010/1110120010-variant-02.webp`,
    ],
    filterAttributes: { config: ["오픈형"], size: ["4인"] },
    sections: createSections({ variantId: "1110120010" }),
  },
  "1110120011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110120011/1110120011-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120011/1110120011-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120011/1110120011-variant-02.webp`,
    ],
    filterAttributes: { config: ["와이드"], size: ["4인"] },
    sections: createSections({ variantId: "1110120011" }),
  },
  "1110120012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110120012/1110120012-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120012/1110120012-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120012/1110120012-variant-02.webp`,
    ],
    filterAttributes: { config: ["카우치형"], size: ["4인"] },
    sections: createSections({ variantId: "1110120012" }),
  },
  "1110120013": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110120013/1110120013-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120013/1110120013-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1110120013/1110120013-variant-02.webp`,
    ],
    filterAttributes: { config: ["라운지형"], size: ["4인"] },
    sections: createSections({ variantId: "1110120013" }),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? moaSofaFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: moaSofaFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1110120010",
    familyId: "moa-sofa",
    name: "모아 모듈형 패브릭소파 4인 오픈형",
    variantLabel: "4인 오픈형",
    thumbnail: thumbnailFor("1110120010"),
    hoverImage: hoverImageFor("1110120010"),
    brand: "한샘",
    price: 718000,
    originalPrice: 967000,
    discountRate: 26,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 1180,
    category: ["거실", "소파", "패브릭소파"],
    categoryTags: ["모듈형소파", "4인소파"],
    filterAttributes: { config: ["오픈형"], size: ["4인"] },
  },
  {
    id: "1110120011",
    familyId: "moa-sofa",
    name: "모아 모듈형 패브릭소파 와이드 4인",
    variantLabel: "와이드 4인",
    thumbnail: thumbnailFor("1110120011"),
    hoverImage: hoverImageFor("1110120011"),
    brand: "한샘",
    price: 938000,
    originalPrice: 1256000,
    discountRate: 25,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 690,
    category: ["거실", "소파", "패브릭소파"],
    categoryTags: ["모듈형소파", "4인소파"],
    filterAttributes: { config: ["와이드"], size: ["4인"] },
  },
  {
    id: "1110120012",
    familyId: "moa-sofa",
    name: "모아 모듈형 패브릭소파 와이드 4인 카우치형",
    variantLabel: "4인 카우치형",
    thumbnail: thumbnailFor("1110120012"),
    hoverImage: hoverImageFor("1110120012"),
    brand: "한샘",
    price: 1020000,
    originalPrice: 1356000,
    discountRate: 25,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 590,
    category: ["거실", "소파", "패브릭소파"],
    categoryTags: ["모듈형소파", "4인소파", "카우치소파"],
    filterAttributes: { config: ["카우치형"], size: ["4인"] },
  },
  {
    id: "1110120013",
    familyId: "moa-sofa",
    name: "모아 모듈형 패브릭소파 4인 라운지형",
    variantLabel: "4인 라운지형",
    thumbnail: thumbnailFor("1110120013"),
    hoverImage: hoverImageFor("1110120013"),
    brand: "한샘",
    price: 1123000,
    originalPrice: 1490000,
    discountRate: 25,
    rating: 4.8,
    reviewCount: 42,
    salesCount: 2350,
    badge: { text: "패브릭소파 판매 1위", bgColor: "#FE5A5D" },
    category: ["거실", "소파", "패브릭소파"],
    categoryTags: ["모듈형소파", "4인소파", "카우치소파"],
    filterAttributes: { config: ["라운지형"], size: ["4인"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`moa-sofa SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`moa-sofa variant data missing: ${id}`);
  return {
    ...summary,
    ...moaSofaFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
