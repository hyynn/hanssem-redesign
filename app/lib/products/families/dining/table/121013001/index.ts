import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const donoEdgeFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "식탁", "세라믹식탁"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "한샘배송 (전문 배송팀 조립·설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
  sharedImages: [
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1210130010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1210130010/1210130010-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1210130010/1210130010-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1210130010/1210130010-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1210130010/1210130010-main-04.webp`,
    ],
    filterAttributes: { size: ["4인용"], config: ["의자포함"] },
    sections: createSections({
      title: "도노 엣지 세라믹 식탁세트 4인용",
      body: "4인 가족을 위한 콤팩트한 사이즈로, 강화 세라믹 상판과 위드의자 4개가 함께 구성되어 별도 구매 없이 바로 다이닝 세팅을 완성할 수 있습니다.",
    }),
  },
  "1210130011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1210130011/1210130011-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1210130011/1210130011-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1210130011/1210130011-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1210130011/1210130011-main-04.webp`,
    ],
    filterAttributes: { size: ["6인용"], config: ["의자포함"] },
    sections: createSections({
      title: "도노 엣지 세라믹 식탁세트 6인용",
      body: "넓은 다이닝 공간을 위한 6인용 사이즈로, 강화 세라믹 상판과 위드의자 4개가 함께 구성되어 모임이 많은 가정에도 여유롭게 사용하실 수 있습니다.",
    }),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? donoEdgeFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: donoEdgeFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1210130010",
    familyId: "dono-edge-ceramic-table",
    name: "도노 엣지 세라믹 식탁세트 4인용 (위드의자4 포함)",
    variantLabel: "4인용",
    thumbnail: thumbnailFor("1210130010"),
    hoverImage: hoverImageFor("1210130010"),
    brand: "한샘",
    price: 908000,
    originalPrice: 1140000,
    discountRate: 20,
    rating: 4.8,
    reviewCount: 13,
    salesCount: 230,
    category: ["다이닝", "식탁", "세라믹식탁"],
    categoryTags: ["4인용식탁"],
    colors: ["코튼화이트", "화이트마블"],
    filterAttributes: { size: ["4인용"], config: ["의자포함"] },
  },
  {
    id: "1210130011",
    familyId: "dono-edge-ceramic-table",
    name: "도노 엣지 세라믹 식탁세트 6인용 (위드의자4 포함)",
    variantLabel: "6인용",
    thumbnail: thumbnailFor("1210130011"),
    hoverImage: hoverImageFor("1210130011"),
    brand: "한샘",
    price: 1037000,
    originalPrice: 1275000,
    discountRate: 19,
    rating: 4.8,
    reviewCount: 14,
    salesCount: 260,
    category: ["다이닝", "식탁", "세라믹식탁"],
    categoryTags: ["6인용식탁이상"],
    colors: ["코튼화이트", "화이트마블"],
    filterAttributes: { size: ["6인용"], config: ["의자포함"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`dono-edge-ceramic-table SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`dono-edge-ceramic-table variant data missing: ${id}`);
  return {
    ...summary,
    ...donoEdgeFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
