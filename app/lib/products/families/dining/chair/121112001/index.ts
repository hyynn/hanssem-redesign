import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const libupBenchFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "의자", "벤치·스툴의자"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1211120010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1211120010/1211120010-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1211120010/1211120010-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1211120010/1211120010-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1211120010/1211120010-variant-01.webp`,
    ],
    filterAttributes: { size: ["900"] },
    sections: createSections({
      title: "군더더기 없는 900 사이즈 벤치의자",
      body: "리브업 900 벤치의자는 2인이 나란히 앉기 좋은 콤팩트한 사이즈입니다. 좁은 다이닝 공간에서도 부담 없이 배치할 수 있습니다.",
      variantId: "1211120010",
    }),
  },
  "1211120011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-main-05.webp`,
      `/images/products/${FAMILY_PATH}/1211120011/1211120011-variant-01.webp`,
    ],
    filterAttributes: { size: ["1800"] },
    sections: createSections({
      title: "가족이 다같이 앉는 1800 사이즈 벤치의자",
      body: "리브업 1800 벤치의자는 3~4인이 여유롭게 앉을 수 있는 넉넉한 사이즈입니다. 긴 식탁이나 넓은 다이닝 공간에 어울립니다.",
      variantId: "1211120011",
    }),
  },
  "1211120012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1211120012/1211120012-main-01.webp`,
      `/images/products/${FAMILY_PATH}/1211120012/1211120012-main-02.webp`,
      `/images/products/${FAMILY_PATH}/1211120012/1211120012-main-03.webp`,
      `/images/products/${FAMILY_PATH}/1211120012/1211120012-main-04.webp`,
      `/images/products/${FAMILY_PATH}/1211120012/1211120012-variant-01.webp`,
    ],
    filterAttributes: { size: ["2520"], config: ["세트"] },
    sections: createSections({
      title: "라운지처럼 편안한 2520 라운지벤치 세트",
      body: "리브업 2520 라운지벤치 세트는 넓은 좌석과 등받이 쿠션까지 더해 라운지 소파처럼 편안하게 앉을 수 있는 대형 구성입니다. 넓은 다이닝·거실 겸용 공간에 어울립니다.",
      variantId: "1211120012",
    }),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? libupBenchFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: libupBenchFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211120010",
    familyId: "libup-bench",
    name: "리브업 900 벤치의자",
    variantLabel: "900벤치",
    thumbnail: thumbnailFor("1211120010"),
    hoverImage: hoverImageFor("1211120010"),
    brand: "한샘",
    price: 385000,
    originalPrice: 385000,
    rating: 4.9,
    reviewCount: 41,
    salesCount: 180,
    badge: { text: "벤치의자 판매 1위", bgColor: "#FE5A5D" },
    category: ["다이닝", "의자", "벤치·스툴의자"],
    filterAttributes: { size: ["900"] },
  },
  {
    id: "1211120011",
    familyId: "libup-bench",
    name: "리브업 1800 벤치의자",
    variantLabel: "1800벤치",
    thumbnail: thumbnailFor("1211120011"),
    hoverImage: hoverImageFor("1211120011"),
    brand: "한샘",
    price: 840000,
    originalPrice: 840000,
    rating: 4.9,
    reviewCount: 41,
    salesCount: 90,
    category: ["다이닝", "의자", "벤치·스툴의자"],
    filterAttributes: { size: ["1800"] },
  },
  {
    id: "1211120012",
    familyId: "libup-bench",
    name: "리브업 2520 라운지벤치 세트",
    variantLabel: "2520 라운지세트",
    thumbnail: thumbnailFor("1211120012"),
    hoverImage: hoverImageFor("1211120012"),
    brand: "한샘",
    price: 1700000,
    originalPrice: 1700000,
    rating: 4.9,
    reviewCount: 41,
    salesCount: 35,
    category: ["다이닝", "의자", "벤치·스툴의자"],
    filterAttributes: { size: ["2520"], config: ["세트"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`libup-bench SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`libup-bench variant data missing: ${id}`);
  return {
    ...summary,
    ...libupBenchFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
