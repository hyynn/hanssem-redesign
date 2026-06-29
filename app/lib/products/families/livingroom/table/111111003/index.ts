import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const clintUrbanFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "거실장·테이블", "테이블"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "한샘배송 (전문 배송팀 설치 포함)",
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
  "1111110030": {
    variantImages: [],
    filterAttributes: { feature: ["리프트업", "플랩도어"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? clintUrbanFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1111110030",
    familyId: "clint-urban-liftup-sofa-table",
    name: "클린트 어반 리프트업 소파테이블 플랩도어형105cm",
    thumbnail: thumbnailFor("1111110030"),
    brand: "한샘",
    price: 365000,
    originalPrice: 412000,
    discountRate: 11,
    rating: 4.7,
    reviewCount: 23,
    category: ["거실", "거실장·테이블", "테이블"],
    colors: ["화이트", "머드베이지"],
    filterAttributes: { feature: ["리프트업", "플랩도어"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`clint-urban-liftup-sofa-table SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`clint-urban-liftup-sofa-table variant data missing: ${id}`);
  return {
    ...summary,
    ...clintUrbanFamily,
    familyId: summary.familyId,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
