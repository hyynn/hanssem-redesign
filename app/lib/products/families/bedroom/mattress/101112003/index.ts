import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const foseasonBaseFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "매트리스", "토퍼·하단매트리스"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 배송팀)",
    region: "전국 (제주/도서 지역 배송 불가)",
  },
  deliveryGuides,
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
  "1011120030": {
    variantImages: [],
    filterAttributes: { size: ["SS"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? foseasonBaseFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1011120030",
    familyId: "foseason-base",
    name: "포시즌 하단 베이스 SS",
    thumbnail: thumbnailFor("1011120030"),
    brand: "한샘",
    price: 420000,
    originalPrice: 420000,
    discountRate: 0,
    rating: 4.5,
    reviewCount: 11,
    category: ["침실", "매트리스", "토퍼·하단매트리스"],
    filterAttributes: { size: ["SS"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`foseason-base SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`foseason-base variant data missing: ${id}`);
  return {
    ...summary,
    ...foseasonBaseFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
