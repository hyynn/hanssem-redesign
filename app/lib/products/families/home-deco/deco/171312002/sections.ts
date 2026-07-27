import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171312002";
export const FAMILY_CODE = "171312002";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 방향제(디퓨저) / 소재: 디퓨저액(향료), 유리 용기, 원목 캡, 리드스틱 / 용량: 200ml / 제조국: 대한민국 / KC 생활화학제품 안전확인대상 신고필증 취득 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "사계절 내내 곁에 두는 포시즌 디퓨저",
          body: "계절에 상관없이 오래 곁에 둘 수 있도록 만든 200ml 디퓨저입니다. 청량한 소나무향과 싱그러운 정원향 두 가지로 취향과 공간에 맞게 고를 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "포시즌 디퓨저 200ml 기본정보" },
      ],
    },
    {
      id: "fragrance",
      label: "향",
      blocks: [
        {
          type: "text",
          title: "PINE - 밤, 은하수 그리고 소나무",
          body: "은하수가 떠오른 숲에서는 상쾌한 솔나무와 산뜻한 이끼가 어우러져 퍼지는 향기가 공존합니다. 마치 우주의 신비로운 아름다움과 자연의 평화를 담아내듯 느껴집니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-fragrance-01.webp`, alt: "포시즌 디퓨저 200ml 소나무향 안내" },
        {
          type: "text",
          title: "GARDEN - 아침, 햇살 그리고 정원",
          body: "설레는 마음으로 나선 정원에는 따사로운 햇살이 내리쬐고, 돋아나는 새싹과, 장미 그리고 자스민의 향기가 봄을 안내합니다. 싱그러운 새싹과 살짝 이슬을 머금은 풀, 생화의 향기가 바람을 타고와 나를 기분좋게 합니다."
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-fragrance-02.webp`, alt: "포시즌 디퓨저 200ml 정원향 안내" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "리드스틱 개수로 조절하는 향의 세기",
          body: "동봉된 리드스틱을 꽂는 개수로 향의 세기를 취향껏 조절할 수 있습니다. 2주에 한 번 정도 스틱을 뒤집어주면 더 오래 은은한 향을 즐길 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "포시즌 디퓨저 200ml 향 조절 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "포시즌 디퓨저 200ml 소재" },
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
