import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const euro501FlatBarChairFamily: Omit<ProductFamily, "familyId"> = {
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
  "1211110020": {
    variantImages: [],
    filterAttributes: { feature: ["메탈"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? euro501FlatBarChairFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: euro501FlatBarChairFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1211110020",
    familyId: "euro-501-flat-bar-chair",
    name: "유로 501 플랫 바체어",
    thumbnail: thumbnailFor("1211110020"),
    hoverImage: hoverImageFor("1211110020"),
    brand: "한샘",
    price: 183000,
    originalPrice: 183000,
    rating: 4.2,
    reviewCount: 7,
    salesCount: 40,
    category: ["다이닝", "의자", "바체어"],
    colors: ["블랙", "화이트"],
    filterAttributes: { feature: ["메탈"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`euro-501-flat-bar-chair SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`euro-501-flat-bar-chair variant data missing: ${id}`);
  return {
    ...summary,
    ...euro501FlatBarChairFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
