import type { ProductFamily, ProductSummary, ProductDetail, FilterAttributes, ProductDetailSection } from "@/app/lib/types";
import { FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections } from "./sections";
import { sharedReviews, sharedQnaItems } from "./reviews";

export { FAMILY_PATH, FAMILY_CODE };

const monoBedFamily: Omit<ProductFamily, "familyId"> = {
  breadcrumb: ["침실", "침대", "호텔침대"],
  promotions: [
    { title: "6월 쌤위크", image: "/images/promotions/saemweek-2026-06.webp" },
    { title: "침실이벤트 리뷰", image: "/images/promotions/bedroom-event-review.webp" },
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

export const summaries: ProductSummary[] = [
  {
    id: "1010120010",
    familyId: "mono-bed",
    name: "호텔침대 모노침대 Q/K (색상2종, 하부서랍 선택)",
    variantLabel: "Q/K 단품",
    thumbnail: `/images/products/${FAMILY_PATH}/1010120010/1010120010-main-01.webp`,
    brand: "한샘",
    price: 588870,
    originalPrice: 727000,
    discountRate: 19,
    rating: 4.7,
    reviewCount: 12,
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["수납침대", "Q/K침대"],
    filterAttributes: { size: ["Q/K"], config: ["침대"], feature: ["조명리모컨형"] },
  },
  {
    id: "1010120011",
    familyId: "mono-bed",
    name: "호텔침대 모노침대 KK (색상2종, 하부서랍 선택)",
    variantLabel: "KK 단품",
    thumbnail: `/images/products/${FAMILY_PATH}/1010120011/1010120011-main-01.webp`,
    brand: "한샘",
    price: 660150,
    originalPrice: 815000,
    discountRate: 19,
    rating: 4.7,
    reviewCount: 15,
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["수납침대", "KK침대"],
    filterAttributes: { size: ["KK"], config: ["침대"], feature: ["조명리모컨형"] },
  },
  {
    id: "1010120012",
    familyId: "mono-bed",
    name: "호텔침대 모노침대 Q/K (색상2종, 하부서랍 선택) + 밸런스 볼륨탑 매트리스",
    variantLabel: "Q/K + 밸런스매트리스",
    thumbnail: `/images/products/${FAMILY_PATH}/1010120012/1010120012-main-01.webp`,
    brand: "한샘",
    price: 1008040,
    originalPrice: 1270000,
    discountRate: 21,
    rating: 4.8,
    reviewCount: 28,
    badge: { text: "호텔침대 판매 2위", bgColor: "#FE5A5D" },
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["수납침대", "Q/K침대"],
    filterAttributes: { size: ["Q/K"], config: ["침대+매트"], feature: ["조명리모컨형"] },
  },
  {
    id: "1010120013",
    familyId: "mono-bed",
    name: "호텔침대 모노침대 KK (색상2종, 하부서랍 선택) + 밸런스 볼륨탑 매트리스",
    variantLabel: "KK + 밸런스매트리스",
    thumbnail: `/images/products/${FAMILY_PATH}/1010120013/1010120013-main-01.webp`,
    brand: "한샘",
    price: 1280840,
    originalPrice: 1804000,
    discountRate: 29,
    rating: 4.9,
    reviewCount: 40,
    badge: { text: "호텔침대 판매 3위", bgColor: "#FE5A5D" },
    category: ["침실", "침대", "호텔침대"],
    categoryTags: ["수납침대", "KK침대"],
    filterAttributes: { size: ["KK"], config: ["침대+매트"], feature: ["조명리모컨형"] },
  },
];

type VariantData = {
  variantImages: string[];
  filterAttributes: FilterAttributes;
  sections: ProductDetailSection[];
};

const variantDetails: Record<string, VariantData> = {
  "1010120010": {
    variantImages: [],
    filterAttributes: { size: ["Q/K"], config: ["침대"], feature: ["조명리모컨형"] },
    sections: createSections({
      title: "모노 침대 Q/K 단품",
      body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다. 퀸·킹 사이즈 모두 지원하며, 보유하신 매트리스와 함께 사용 가능합니다.",
    }),
  },
  "1010120011": {
    variantImages: [],
    filterAttributes: { size: ["KK"], config: ["침대"], feature: ["조명리모컨형"] },
    sections: createSections({
      title: "모노 침대 KK 단품",
      body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다. 매트리스는 별도 구매하시거나 기존 보유 매트리스와 함께 사용 가능합니다.",
    }),
  },
  "1010120012": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1010120012/1010120012-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1010120012/1010120012-variant-02.webp`,
    ],
    filterAttributes: { size: ["Q/K"], config: ["침대+매트"], feature: ["조명리모컨형"] },
    sections: createSections({
      title: "모노 침대 Q/K + 밸런스 매트리스",
      body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다.",
    }),
  },
  "1010120013": {
    variantImages: [
      `/images/products/${FAMILY_PATH}/1010120013/1010120013-variant-01.webp`,
      `/images/products/${FAMILY_PATH}/1010120013/1010120013-variant-02.webp`,
      `/images/products/${FAMILY_PATH}/1010120013/1010120013-variant-03.webp`,
    ],
    filterAttributes: { size: ["KK"], config: ["침대+매트"], feature: ["조명리모컨형"] },
    sections: createSections({
      title: "모노 침대 KK + 밸런스 매트리스",
      body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다.",
    }),
  },
};

export function getDetail(id: string): ProductDetail {
  const summary = summaries.find((s) => s.id === id);
  if (!summary) throw new Error(`mono-bed SKU not found: ${id}`);
  const variant = variantDetails[id];
  if (!variant) throw new Error(`mono-bed variant data missing: ${id}`);
  return {
    ...summary,
    ...monoBedFamily,
    ...variant,
    siblings: summaries,
    reviews: sharedReviews,
    qnaItems: sharedQnaItems,
  };
}
