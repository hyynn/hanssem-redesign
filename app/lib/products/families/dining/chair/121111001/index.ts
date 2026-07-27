import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const heardLeatherBarChairFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "의자", "바체어"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1211110010": {
    variantImages: [`/images/products/${FAMILY_PATH}/1211110010/1211110010-main-01.webp`],
    filterAttributes: { feature: ["가죽"] },
    sections: createSections(),
  },
  "1211110011": {
    variantImages: [`/images/products/${FAMILY_PATH}/1211110011/1211110011-main-01.webp`],
    filterAttributes: { feature: ["가죽"], config: ["세트"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? heardLeatherBarChairFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: heardLeatherBarChairFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211110010",
    familyId: "heard-leather-bar-chair",
    name: "허드 가죽 바체어 (2종/택1)",
    thumbnail: thumbnailFor("1211110010"),
    hoverImage: hoverImageFor("1211110010"),
    brand: "한샘",
    price: 69900,
    originalPrice: 96000,
    rating: 4.7,
    reviewCount: 24,
    salesCount: 150,
    category: ["다이닝", "의자", "바체어"],
    colors: ["그레이", "카멜"],
    filterAttributes: { feature: ["가죽"] },
  },
  {
    id: "1211110011",
    familyId: "heard-leather-bar-chair",
    name: "1+1 허드 가죽 바체어 (2종/택1)",
    thumbnail: thumbnailFor("1211110011"),
    hoverImage: hoverImageFor("1211110011"),
    brand: "한샘",
    price: 110000,
    originalPrice: 192000,
    rating: 4.7,
    reviewCount: 24,
    salesCount: 150,
    category: ["다이닝", "의자", "바체어"],
    colors: ["그레이", "카멜"],
    filterAttributes: { feature: ["가죽"], config: ["세트"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`heard-leather-bar-chair SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`heard-leather-bar-chair variant data missing: ${id}`);
  return {
    ...summary,
    ...heardLeatherBarChairFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
