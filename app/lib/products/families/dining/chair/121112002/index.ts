import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const blancChairStoolFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["다이닝", "의자", "벤치·스툴의자"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1211120020": {
    variantImages: [],
    filterAttributes: { config: ["체어/스툴 겸용"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? blancChairStoolFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: blancChairStoolFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211120020",
    familyId: "blanc-chair-stool",
    name: "블랑 체어/스툴 (4종/택1)",
    thumbnail: thumbnailFor("1211120020"),
    hoverImage: hoverImageFor("1211120020"),
    brand: "한샘",
    price: 49900,
    originalPrice: 61900,
    rating: 4.7,
    reviewCount: 16,
    salesCount: 200,
    category: ["다이닝", "의자", "벤치·스툴의자"],
    colors: ["화이트", "블랙"],
    priceOptionGroups: [
      {
        id: "type",
        label: "타입 선택",
        options: [
          { id: "stool", label: "스툴", priceDelta: 0 },
          { id: "chair", label: "체어", priceDelta: 20000 },
        ],
      },
    ],
    filterAttributes: { config: ["체어/스툴 겸용"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`blanc-chair-stool SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`blanc-chair-stool variant data missing: ${id}`);
  return {
    ...summary,
    ...blancChairStoolFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
