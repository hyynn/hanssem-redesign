import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const jackRoundFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "거실장·테이블", "사이드테이블"],
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
  "1111120010": {
    variantImages: [],
    filterAttributes: {},
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? jackRoundFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1111120010",
    familyId: "jack-400-round-side-table",
    name: "재크 400 라운드 사이드테이블",
    thumbnail: thumbnailFor("1111120010"),
    brand: "한샘",
    price: 39900,
    originalPrice: 69000,
    discountRate: 42,
    rating: 4.8,
    reviewCount: 18,
    category: ["거실", "거실장·테이블", "사이드테이블"],
    colors: ["블랙", "그레이", "베이지", "화이트"],
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`jack-400-round-side-table SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`jack-400-round-side-table variant data missing: ${id}`);
  return {
    ...summary,
    ...jackRoundFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
