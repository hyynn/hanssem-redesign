import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const balanceSEurotopFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "매트리스", "퀸·킹매트리스"],
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
  "1011110010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011110010/1011110010-main-01.webp`,
    ],
    filterAttributes: { size: ["SS"] },
    sections: createSections(),
  },
  "1011110011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011110011/1011110011-main-01.webp`,
    ],
    filterAttributes: { size: ["Q"] },
    sections: createSections(),
  },
  "1011110012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011110012/1011110012-main-01.webp`,
    ],
    filterAttributes: { size: ["K"] },
    sections: createSections(),
  },
  "1011110013": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1011110013/1011110013-main-01.webp`,
    ],
    filterAttributes: { size: ["KK"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? balanceSEurotopFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1011110010",
    familyId: "balance-s-eurotop",
    name: "밸런스S 유로탑 매트리스 SS",
    variantLabel: "SS",
    thumbnail: thumbnailFor("1011110010"),
    brand: "한샘",
    price: 609000,
    originalPrice: 609000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 39,
    category: ["침실", "매트리스", "슈퍼·싱글매트리스"],
    filterAttributes: { size: ["SS"] },
  },
  {
    id: "1011110011",
    familyId: "balance-s-eurotop",
    name: "밸런스S 유로탑 매트리스 Q",
    variantLabel: "Q",
    thumbnail: thumbnailFor("1011110011"),
    brand: "한샘",
    price: 919000,
    originalPrice: 919000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 39,
    category: ["침실", "매트리스", "퀸·킹매트리스"],
    filterAttributes: { size: ["Q"] },
  },
  {
    id: "1011110012",
    familyId: "balance-s-eurotop",
    name: "밸런스S 유로탑 매트리스 K",
    variantLabel: "K",
    thumbnail: thumbnailFor("1011110012"),
    brand: "한샘",
    price: 1129000,
    originalPrice: 1129000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 39,
    category: ["침실", "매트리스", "퀸·킹매트리스"],
    filterAttributes: { size: ["K"] },
  },
  {
    id: "1011110013",
    familyId: "balance-s-eurotop",
    name: "밸런스S 유로탑 매트리스 KK",
    variantLabel: "KK",
    thumbnail: thumbnailFor("1011110013"),
    brand: "한샘",
    price: 1329000,
    originalPrice: 1329000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 39,
    category: ["침실", "매트리스", "KK매트리스"],
    filterAttributes: { size: ["KK"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`balance-s-eurotop SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`balance-s-eurotop variant data missing: ${id}`);
  return {
    ...summary,
    ...balanceSEurotopFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
