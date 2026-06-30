import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const foreComfortFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "식탁", "6인용식탁이상"],
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
  "1210120010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1210120010/1210120010-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1210120010/1210120010-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1210120010/1210120010-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1210120010/1210120010-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1210120010/1210120010-main-05.webp`,
    ],
    filterAttributes: { size: ["6인용"], config: ["베이직세트"] },
    sections: createSections({
      title: "포레 컴포트 6인 베이직세트",
      body: "벤치 1개와 원목의자 2개로 구성된 베이직세트로, 합리적인 구성으로 6인이 넉넉하게 앉을 수 있는 다이닝 공간을 완성합니다.",
    }),
  },
  "1210120011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1210120011/1210120011-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1210120011/1210120011-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1210120011/1210120011-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1210120011/1210120011-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1210120011/1210120011-main-05.webp`,
    ],
    filterAttributes: { size: ["6인용"], config: ["라운지세트"] },
    sections: createSections({
      title: "포레 컴포트 6인 라운지세트",
      body: "벤치 1개와 코너벤치 1개, 원목의자 2개로 구성된 라운지세트로, 여유로운 좌석 배치로 가족 모임이 많은 공간에 어울립니다.",
    }),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? foreComfortFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: foreComfortFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1210120010",
    familyId: "fore-comfort-dining-set",
    name: "포레 컴포트 6인 베이직세트 (벤치1,원목의자2 포함)",
    variantLabel: "베이직세트",
    thumbnail: thumbnailFor("1210120010"),
    hoverImage: hoverImageFor("1210120010"),
    brand: "한샘",
    price: 973000,
    originalPrice: 1172000,
    discountRate: 17,
    rating: 4.8,
    reviewCount: 10,
    salesCount: 160,
    category: ["다이닝", "식탁", "6인용식탁이상"],
    categoryTags: ["원목식탁"],
    colors: ["화이트", "베이지"],
    filterAttributes: { size: ["6인용"], config: ["베이직세트"] },
  },
  {
    id: "1210120011",
    familyId: "fore-comfort-dining-set",
    name: "포레 컴포트 6인 라운지세트 (벤치1, 코너벤치1, 원목의자2 포함)",
    variantLabel: "라운지세트",
    thumbnail: thumbnailFor("1210120011"),
    hoverImage: hoverImageFor("1210120011"),
    brand: "한샘",
    price: 1368000,
    originalPrice: 1641000,
    discountRate: 17,
    rating: 4.8,
    reviewCount: 11,
    salesCount: 870,
    badge: { text: "식탁 판매 2위", bgColor: "#FE5A5D" },
    category: ["다이닝", "식탁", "6인용식탁이상"],
    categoryTags: ["원목식탁"],
    colors: ["화이트", "베이지"],
    filterAttributes: { size: ["6인용"], config: ["라운지세트"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`fore-comfort-dining-set SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`fore-comfort-dining-set variant data missing: ${id}`);
  return {
    ...summary,
    ...foreComfortFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
