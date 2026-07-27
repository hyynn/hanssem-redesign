import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171012001";
export const FAMILY_CODE = "171012001";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 차렵이불세트 / 소재: 겉감 냉감 원단·피치스킨(양면), 충전재 마이크로화이바 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "여름을 위한 양면 차렵이불세트",
          body: "한 면은 보들보들한 피치스킨, 다른 한 면은 닿는 순간 시원한 냉감 원단으로 마감한 양면 차렵이불세트. 그날의 온도에 맞춰 뒤집어 덮기만 하면 열대야에도 쾌적한 잠자리가 완성됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "보들&냉감 양면 여름 차렵이불세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "온도에 따라 골라 덮는 양면 설계",
          body: "에어컨을 켠 밤에는 보들면을, 후텁지근한 밤에는 냉감면을 몸쪽으로 덮으세요. 접촉냉감 원단이 체온을 빠르게 분산시켜 이불 속 온도를 한 단계 낮춰줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "보들&냉감 양면 여름 차렵이불세트 양면 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "보들&냉감 양면 여름 차렵이불세트 소재" },
        {
          type: "text",
          title: "가볍고 세탁이 쉬운 여름 충전재",
          body: "통기성 좋은 마이크로화이바 충전재를 얇고 고르게 넣어 여름 내내 가볍게 덮을 수 있습니다. 가정용 세탁기로 통세탁이 가능해 자주 빨아 쓰기 좋습니다.",
        },
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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
