import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171312001";
export const FAMILY_CODE = "171312001";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 방향제(디퓨저) / 소재: 규조토(도자기), 디퓨저액, 리드스틱 / 용량: 200ml / 제조국: 대한민국 / KC 생활화학제품 안전확인대상 신고필증 취득 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "백자 달항아리를 닮은 규조토 디퓨저",
          body: "달항아리의 곡선을 그대로 옮겨온 규조토 디퓨저 세트입니다. 은은한 향과 함께 공간 한켠에 두는 것만으로도 오브제 역할을 하는 디자인입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "달항아리 규조토 디퓨저 세트 기본정보" },
      ],
    },
    {
      id: "fragrance",
      label: "향",
      blocks: [
        {
          type: "text",
          title: "한샘 시그니처 소나무향",
          body: "은하수가 떠오른 숲에서는 상쾌한 솔나무와 산뜻한 이끼가 어우러져 퍼지는 향기가 공존합니다. 마치 우주의 신비로운 아름다움과 자연의 평화를 담아내듯 느껴집니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-fragrance-01.webp`, alt: "달항아리 규조토 디퓨저 향 안내" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "규조토의 조습 기능으로 은은하게",
          body: "규조토 특유의 미세기공이 디퓨저액을 서서히 머금었다가 내보내 향이 과하지 않고 은은하게 퍼집니다. 리드스틱을 꽂아두는 것만으로 별도 조작 없이 향이 유지됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "달항아리 규조토 디퓨저 세트 조습 기능" },
      ],
    },
    {
      id: "usage",
      label: "사용법",
      blocks: [
        {
          type: "text",
          title: "향을 입혀 사용합니다.",
          body: "달항아리 규조토에 오일을 3-4방울 떨어뜨려 적신 뒤, 자연스럽게 발향이 되도록 사용해 주시면 됩니다. 향이 약해졌을 경우, 오일을 추가하시면 됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-usage-01.webp`, alt: "달항아리 규조토 디퓨저 세트 사용법" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "자연 소재 그대로의 규조토 용기",
          body: "화학 코팅 없이 규조토 본연의 질감을 살린 용기라 시간이 지나도 특유의 흡습 기능이 유지됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "달항아리 규조토 디퓨저 세트 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "달항아리 규조토 디퓨저 세트 소재 상세" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 생활화학제품 안전기준을 통과한 제품입니다. 수령 후 용기 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
