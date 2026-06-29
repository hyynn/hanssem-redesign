import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const lunesoftBedFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "침대", "호텔침대"],
  promotions: [
    { title: "6월 프로모션", image: "/images/promotions/promotion-01.webp" },
    { title: "인테리어 프로모션", image: "/images/promotions/promotion-02.webp" },
  ],
  deliveryInfo: {
    method: "사전판매 (결제 후 순차 배송)",
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
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-08.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-09.webp`,
    `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-shared-10.webp`,
  ],
};

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1010120020": {
    variantImages: [
    ],
    filterAttributes: { size: ["Q/K"], config: ["침대"], feature: ["리모컨형"] },
    sections: createSections({
      title: "룬소프트 침대 리모컨형 Q/K (매트별도)",
      body: "부드러운 패브릭 헤드보드와 정밀한 모터 시스템이 결합된 룬소프트 리모컨형 침대입니다. 리모컨 하나로 헤드 각도를 자유롭게 조절할 수 있어 독서·TV 시청·취침 등 다양한 상황에 맞는 자세를 설정할 수 있습니다. 퀸·킹 사이즈 모두 지원하며, 기존 매트리스와 함께 사용 가능합니다.",
    }),
  },
  "1010120021": {
    variantImages: [
    ],
    filterAttributes: { size: ["KK"], config: ["침대"], feature: ["리모컨형"] },
    sections: createSections({
      title: "룬소프트 침대 리모컨형 KK (매트별도)",
      body: "부드러운 패브릭 헤드보드와 정밀한 모터 시스템이 결합된 룬소프트 리모컨형 침대입니다. 리모컨 하나로 헤드 각도를 자유롭게 조절할 수 있어 독서·TV 시청·취침 등 다양한 상황에 맞는 자세를 설정할 수 있습니다. KK(킹킹) 사이즈로 넓은 침면을 제공하며, 기존 매트리스와 함께 사용 가능합니다.",
    }),
  },
};

function thumbnailFor(id: string): string {
  return variantDetails[id].variantImages[0] ?? lunesoftBedFamily.sharedImages[0];
}

export const summaries: ProductSummary[] = [
  {
    id: "1010120020",
    familyId: "lunesoft-bed",
    name: "호텔침대 룬소프트 침대 리모컨형 Q/K (매트별도)",
    variantLabel: "Q/K 단품",
    thumbnail: thumbnailFor("1010120020"),
    brand: "한샘",
    price: 1429000,
    originalPrice: 1429000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 10,
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["Q/K침대"],
    filterAttributes: { size: ["Q/K"], config: ["침대"], feature: ["리모컨형"] },
  },
  {
    id: "1010120021",
    familyId: "lunesoft-bed",
    name: "호텔침대 룬소프트 침대 리모컨형 KK (매트별도)",
    variantLabel: "KK 단품",
    thumbnail: thumbnailFor("1010120021"),
    brand: "한샘",
    price: 1829000,
    originalPrice: 1829000,
    discountRate: 0,
    rating: 4.8,
    reviewCount: 10,
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["KK침대"],
    filterAttributes: { size: ["KK"], config: ["침대"], feature: ["리모컨형"] },
  },
];

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`lunesoft-bed SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`lunesoft-bed variant data missing: ${id}`);
  return {
    ...summary,
    ...lunesoftBedFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
