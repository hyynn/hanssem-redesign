import { assembleGallery } from "@/app/lib/types";
import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, notices, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const windowPackageFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["소품", "커튼·블라인드", "커튼"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "직배송 (한샘 전문 시공팀)",
    region: "전국 (제주도 및 도서산간 지역 시공 불가)",
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
  "1712100010": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1712100010/1712100010-main-01.webp`,
    ],
    filterAttributes: { config: ["거실+방2개"], feature: ["블라인드형", "커튼형"] },
    sections: createSections("베이직"),
  },
  "1712100011": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1712100011/1712100011-main-01.webp`,
    ],
    filterAttributes: { config: ["거실+방3개"], feature: ["블라인드형", "커튼형"] },
    sections: createSections("플러스"),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? windowPackageFamily.sharedImages[0];
}

function hoverImageFor(id: string): string | undefined {
  return assembleGallery({ sharedImages: windowPackageFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
}

export const summaries: ProductSummary[] = [
  {
    id: "1712100010",
    familyId: "window-20py-package",
    name: "블라인드/커튼 20평형대 베이직 패키지 (거실+방2개)",
    variantLabel: "거실+방2개",
    thumbnail: thumbnailFor("1712100010"),
    hoverImage: hoverImageFor("1712100010"),
    brand: "한샘",
    price: 349000,
    originalPrice: 439000,
    rating: 4.7,
    reviewCount: 21,
    salesCount: 180,
    category: ["소품", "커튼·블라인드", "커튼"],
    categoryTags: ["블라인드"],
    filterAttributes: { config: ["거실+방2개"], feature: ["블라인드형", "커튼형"] },
  },
  {
    id: "1712100011",
    familyId: "window-20py-package",
    name: "블라인드/커튼 20평형대 플러스 패키지 (거실+방3개)",
    variantLabel: "거실+방3개",
    thumbnail: thumbnailFor("1712100011"),
    hoverImage: hoverImageFor("1712100011"),
    brand: "한샘",
    price: 499000,
    originalPrice: 657000,
    rating: 4.7,
    reviewCount: 21,
    salesCount: 290,
    badge: { text: "커튼 판매 2위", bgColor: "#FE5A5D" },
    category: ["소품", "커튼·블라인드", "커튼"],
    categoryTags: ["블라인드"],
    filterAttributes: { config: ["거실+방3개"], feature: ["블라인드형", "커튼형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`window-20py-package SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`window-20py-package variant data missing: ${id}`);
  return {
    ...summary,
    ...windowPackageFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
