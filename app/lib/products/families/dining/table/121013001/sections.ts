import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "dining/table/121013001";
export const FAMILY_CODE = "121013001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "한샘배송 (전문 배송팀 조립·설치 포함)" },
      { label: "배송기간", value: "결제 후 5~7일 이내 순차 배송" },
      { label: "배송비", value: "무료 (제주도 15,000원 선불)" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 식탁·의자 조립 및 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 조립·설치)" },
      { label: "설치 소요시간", value: "약 40~60분" },
      { label: "주의사항", value: "세라믹 상판은 무겁고 충격에 약하므로 설치 위치까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "설치 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 1년 내 무상 A/S" },
    ],
  },
];

export function createSections(basic: { title: string; body: string }): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "text", title: basic.title, body: basic.body },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "도노 엣지 세라믹 식탁세트 기본정보" },
        {
          type: "text",
          title: "엣지 라인이 살아있는 세라믹 상판",
          body: "매끈하게 마감된 엣지 디테일과 세라믹 특유의 차분한 광택이 더해져 어떤 다이닝 공간에도 자연스럽게 어우러집니다.",
        },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "위드의자 구성" },
        {
          type: "text",
          title: "위드의자 4개 풀세트 구성",
          body: "식탁과 디자인 통일감을 갖춘 위드의자 4개가 함께 구성되어, 별도 구매 없이 바로 다이닝 세팅을 완성할 수 있습니다.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "세라믹 상판 소재 클로즈업" },
        {
          type: "text",
          title: "오염과 스크래치에 강한 강화 세라믹",
          body: "고온에서 구워낸 강화 세라믹 상판은 흠집과 열, 오염에 강해 매일 사용하는 식탁으로도 관리하기 편합니다.",
        },
      ],
    },
    {
      id: "caution",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-caution-01.webp`, alt: "주의사항 안내" },
      ],
    },
  ];
}
