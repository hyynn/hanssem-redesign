import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const sokSteelContainerFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "주방수납", "밀폐·보관용기"],
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
  "1711110010": {
    variantImages: [],
    filterAttributes: { config: ["4종/택1"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? sokSteelContainerFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: sokSteelContainerFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1711110010",
    familyId: "sok-steel-container",
    name: "S.O.K 스텐 밀폐용기 (4종/택1)",
    thumbnail: thumbnailFor("1711110010"),
    hoverImage: hoverImageFor("1711110010"),
    brand: "한샘",
    price: 10900,
    originalPrice: 16900,
    rating: 4.9,
    reviewCount: 17,
    salesCount: 180,
    category: ["소품", "주방수납", "밀폐·보관용기"],
    priceOptionGroups: [
      {
        id: "capacity",
        label: "용량 선택",
        options: [
          { id: "600ml", label: "600ml", priceDelta: 0 },
          { id: "1080ml", label: "1080ml", priceDelta: 2000 },
          { id: "1500ml", label: "1500ml", priceDelta: 4000 },
        ],
      },
    ],
    filterAttributes: { config: ["4종/택1"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`sok-steel-container SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`sok-steel-container variant data missing: ${id}`);
  return {
    ...summary,
    ...sokSteelContainerFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
