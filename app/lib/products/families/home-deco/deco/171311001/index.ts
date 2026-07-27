import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const emmaSlubRugFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "인테리어소품", "러그·카페트"],
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
  "1713110010": {
    variantImages: [],
    filterAttributes: { feature: ["워셔블"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? emmaSlubRugFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: emmaSlubRugFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1713110010",
    familyId: "emma-slub-rug",
    name: "엠마 부드러운 사계절 워셔블 슬러브 러그",
    thumbnail: thumbnailFor("1713110010"),
    hoverImage: hoverImageFor("1713110010"),
    brand: "한샘",
    price: 49900,
    originalPrice: 95000,
    rating: 4.9,
    reviewCount: 14,
    salesCount: 290,
    badge: { text: "러그 판매 2위", bgColor: "#FE5A5D" },
    category: ["소품", "인테리어소품", "러그·카페트"],
    colors: ["아이보리", "애쉬그레이", "웜그레이"],
    filterAttributes: { feature: ["워셔블"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`emma-slub-rug SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`emma-slub-rug variant data missing: ${id}`);
  return {
    ...summary,
    ...emmaSlubRugFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
