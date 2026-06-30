import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const mvmeReclineSofaFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["거실", "소파", "리클라이너"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 배송팀 설치 포함)",
    region: "전국 (제주/도서 지역 추가 배송비 발생)",
  },
  deliveryGuides,
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
  "1110110010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110110010/1110110010-main-01.webp`,
    ],
    filterAttributes: { size: ["3인"], feature: ["리클라이너"] },
    sections: createSections(),
  },
  "1110110011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110110011/1110110011-main-01.webp`,
    ],
    filterAttributes: { size: ["4인"], feature: ["리클라이너"] },
    sections: createSections(),
  },
  "1110110012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1110110012/1110110012-main-01.webp`,
    ],
    filterAttributes: { size: ["4인"], config: ["홈바형"], feature: ["리클라이너"] },
    sections: createSections(),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? mvmeReclineSofaFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: mvmeReclineSofaFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1110110010",
    familyId: "mvme-recliner-sofa",
    name: "MVME 프라임 노블 천연가죽 리클라이너 소파 3인",
    variantLabel: "3인",
    thumbnail: thumbnailFor("1110110010"),
    hoverImage: hoverImageFor("1110110010"),
    brand: "한샘",
    price: 1199000,
    originalPrice: 1427000,
    discountRate: 16,
    rating: 4.8,
    reviewCount: 36,
    salesCount: 540,
    category: ["거실", "소파", "리클라이너"],
    categoryTags: ["3인소파", "가죽소파"],
    colors: ["페더화이트", "미드그레이"],
    filterAttributes: { size: ["3인"], feature: ["리클라이너"] },
  },
  {
    id: "1110110011",
    familyId: "mvme-recliner-sofa",
    name: "MVME 프라임 노블 천연가죽 리클라이너 소파 4인",
    variantLabel: "4인",
    thumbnail: thumbnailFor("1110110011"),
    hoverImage: hoverImageFor("1110110011"),
    brand: "한샘",
    price: 1499000,
    originalPrice: 1835000,
    discountRate: 18,
    rating: 4.8,
    reviewCount: 36,
    salesCount: 480,
    category: ["거실", "소파", "리클라이너"],
    categoryTags: ["4인소파", "가죽소파"],
    colors: ["페더화이트", "미드그레이"],
    filterAttributes: { size: ["4인"], feature: ["리클라이너"] },
  },
  {
    id: "1110110012",
    familyId: "mvme-recliner-sofa",
    name: "MVME 프라임 노블 홈바형 천연가죽 리클라이너 소파 4인",
    variantLabel: "홈바형 4인",
    thumbnail: thumbnailFor("1110110012"),
    hoverImage: hoverImageFor("1110110012"),
    brand: "한샘",
    price: 1659000,
    originalPrice: 2035000,
    discountRate: 18,
    rating: 4.8,
    reviewCount: 36,
    salesCount: 1980,
    badge: { text: "리클라이너 판매 1위", bgColor: "#FE5A5D" },
    category: ["거실", "소파", "리클라이너"],
    categoryTags: ["4인소파", "가죽소파"],
    colors: ["페더화이트", "미드그레이"],
    filterAttributes: { size: ["4인"], config: ["홈바형"], feature: ["리클라이너"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mvme-recliner-sofa SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mvme-recliner-sofa variant data missing: ${id}`);
  return {
    ...summary,
    ...mvmeReclineSofaFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
