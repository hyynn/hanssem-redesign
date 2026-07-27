import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const tarpaulinShoppingBagFamily: Omit<ProductFamily, "familyId"> = {
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
  "1713120050": {
    variantImages: [],
    filterAttributes: { size: ["M", "L"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? tarpaulinShoppingBagFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: tarpaulinShoppingBagFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713120050",
    familyId: "tarpaulin-shopping-bag",
    name: "타포린 장바구니 쇼핑백",
    thumbnail: thumbnailFor("1713120050"),
    hoverImage: hoverImageFor("1713120050"),
    brand: "한샘",
    price: 6900,
    originalPrice: 7900,
    rating: 4.4,
    reviewCount: 5,
    salesCount: 70,
    category: ["소품", "인테리어소품", "데코소품"],
    priceOptionGroups: [
      {
        id: "size",
        label: "사이즈 선택",
        options: [
          { id: "m-white", label: "M 화이트", priceDelta: 0 },
          { id: "l-black", label: "L 블랙", priceDelta: 1000 },
        ],
      },
    ],
    filterAttributes: { size: ["M", "L"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`tarpaulin-shopping-bag SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`tarpaulin-shopping-bag variant data missing: ${id}`);
  return {
    ...summary,
    ...tarpaulinShoppingBagFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
