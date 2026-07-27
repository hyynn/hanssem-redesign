import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const balanceGoosePillowFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "침구", "베개솜·베개커버"],
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
  "1710110010": {
    variantImages: [],
    filterAttributes: { feature: ["낮은형", "높은형"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? balanceGoosePillowFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: balanceGoosePillowFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1710110010",
    familyId: "balance-goose-hotel-pillow",
    name: "밸런스 구스필 호텔 베개솜 (2종/택1)",
    thumbnail: thumbnailFor("1710110010"),
    hoverImage: hoverImageFor("1710110010"),
    brand: "한샘",
    price: 14900,
    originalPrice: 22000,
    rating: 4.7,
    reviewCount: 17,
    salesCount: 260,
    category: ["소품", "침구", "베개솜·베개커버"],
    priceOptionGroups: [
      {
        id: "height",
        label: "높이 선택",
        options: [
          { id: "low", label: "낮은형", priceDelta: 0 },
          { id: "high", label: "높은형", priceDelta: 1000 },
        ],
      },
    ],
    filterAttributes: { feature: ["낮은형", "높은형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`balance-goose-hotel-pillow SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`balance-goose-hotel-pillow variant data missing: ${id}`);
  return {
    ...summary,
    ...balanceGoosePillowFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
