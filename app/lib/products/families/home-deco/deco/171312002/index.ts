import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const foseasonDiffuserFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "인테리어소품", "데코소품"],
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
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1713120020": {
    variantImages: [],
    filterAttributes: { feature: ["소나무향", "정원향"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? foseasonDiffuserFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: foseasonDiffuserFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713120020",
    familyId: "foseason-diffuser-200",
    name: "포시즌 디퓨저 200ml",
    thumbnail: thumbnailFor("1713120020"),
    hoverImage: hoverImageFor("1713120020"),
    brand: "한샘",
    price: 15900,
    originalPrice: 25900,
    rating: 4.8,
    reviewCount: 26,
    salesCount: 380,
    badge: { text: "디퓨저 판매 1위", bgColor: "#FE5A5D" },
    category: ["소품", "인테리어소품", "데코소품"],
    priceOptionGroups: [
      {
        id: "scent",
        label: "향 선택",
        options: [
          { id: "pine", label: "소나무향", priceDelta: 0 },
          { id: "garden", label: "정원향", priceDelta: 0 },
        ],
      },
    ],
    filterAttributes: { feature: ["소나무향", "정원향"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`foseason-diffuser-200 SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`foseason-diffuser-200 variant data missing: ${id}`);
  return {
    ...summary,
    ...foseasonDiffuserFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
