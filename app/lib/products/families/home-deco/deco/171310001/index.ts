import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const newKlimtLampFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "인테리어소품", "조명"],
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-07.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1713100010": {
    variantImages: [],
    filterAttributes: { config: ["테이블+플로어"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? newKlimtLampFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: newKlimtLampFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713100010",
    familyId: "new-klimt-lamp-set",
    name: "뉴 클림트 램프 세트 (테이블+플로어)",
    thumbnail: thumbnailFor("1713100010"),
    hoverImage: hoverImageFor("1713100010"),
    brand: "한샘",
    price: 171900,
    originalPrice: 509000,
    rating: 4.9,
    reviewCount: 21,
    salesCount: 300,
    badge: { text: "램프 세트 판매 1위", bgColor: "#FE5A5D" },
    category: ["소품", "인테리어소품", "조명"],
    filterAttributes: { config: ["테이블+플로어"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`new-klimt-lamp-set SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`new-klimt-lamp-set variant data missing: ${id}`);
  return {
    ...summary,
    ...newKlimtLampFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
