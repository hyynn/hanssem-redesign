import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171312004";
export const FAMILY_CODE = "171312004";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 티슈케이스 / 소재: 펠트(폴리에스터 부직포) / 제조국: 중국 / KC 안전기준 부합확인 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "부드러운 촉감의 펠트 티슈케이스",
          body: "포근한 펠트 소재로 만든 심플한 티슈케이스입니다. 가벼운 무게와 부드러운 촉감으로 어디에 두어도 편안한 분위기를 더해줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "펠트 티슈케이스 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "가볍게 접어 사용하는 심플한 구조",
          body: "각티슈를 감싸는 심플한 구조라 사용이 간단하고, 가벼운 무게 덕분에 방마다 옮겨 쓰기도 편합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "펠트 티슈케이스 사용 기능" },
        {
          type: "text",
          title: "벨크로로 간편하게",
          body: "부드러운 펠트 티슈케이스에 벨크로 밴드를 부착하여 편리하게 교체하고 고정하실 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "펠트 티슈케이스 사용 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "펠트 티슈케이스 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단으로 제작된 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
