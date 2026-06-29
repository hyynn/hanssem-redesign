import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/sofa/111013001";
export const FAMILY_CODE = "111013001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "택배 배송" },
      { label: "배송기간", value: "결제 후 2~3일 이내 (영업일 기준)" },
      { label: "배송비", value: "무료" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 1년 내 무상 A/S" },
    ],
  },
];

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "휴 모드 좌식 소파베드 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "휴 모드 좌식 소파베드 기능 설명" },
        {
          type: "text",
          title: "가장 편안한 각도를 위한 14단 기어",
          body: "단계별 섬세한 조절이 가능한 14단 리클라이닝 기능으로 나에게 딱 맞는 각도를 찾아보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "휴 모드 좌식 소파베드 기능 설명" },
      ],
    },
    {
      id: "meterial",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-meterial-01.webp`, alt: "휴 모드 좌식 소파베드 소재 설명" },
        {
          type: "text",
          title: "오염 걱정을 덜어주는 기능성 발수 원단",
          body: "생활 방수가 가능하도록 원단에 발수코팅 가공을 하여 액체가 닿으면 바로 스며들지 않고 튕겨내어 오염을 예방할 수 있습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "휴 모드 좌식 소파베드 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "휴 모드 좌식 소파베드 주의사항" },
        {
          type: "text",
          title: "우리 가족, 우리 아이를 위한 변치 않는 내구성과 검증된 안전성",
          body: "한샘만의 엄격한 품질 테스트로 오래 사용할 수 있는 내구성은 물론, 어린이 사용요건에 준하는 유해성테스트를 통해 가족 모두가 안심하고 사용할 수 있도록 철저하게 검증하였습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-02.webp`, alt: "휴 모드 좌식 소파베드 주의사항" },
        {
          type: "text",
          title: "어린이제품 안전기준 적합성 인증",
          body: "만 3세이상 어린이까지 안심하고 사용할 수 있도록 어린이 공급자적합성 기준을 통과했으며 폼알데하이드를 포함한 유해성 테스트 결과 산업통상자원부 고시 기준 미검출로 모두 기준 통과 땀, 마찰,필링 등 내구성 테스트에서도 4-5등급으로 우수한 결과를 검증했습니다.",
        },
      ],
    },

  ];
}
