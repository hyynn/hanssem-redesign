import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/sofa/111013002";
export const FAMILY_CODE = "111013002";

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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "휴 회전형 라운지 좌식리클라이너 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "휴 회전형 라운지 좌식리클라이너 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "휴 회전형 라운지 좌식리클라이너 기능 설명" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.gif`, alt: "휴 회전형 라운지 좌식리클라이너 기능 설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "휴 회전형 라운지 좌식리클라이너 소재 정보" },
        {
          type: "text",
          title: "아이와 반려동물, 모두를 배려한 소재",
          body: "포근한 텍스처의 부드러운 감촉과 튼튼한 내구성을 모두 경험해보세요. 반려동물과 함께하는 일상에서도 스크래치 걱정없도록, 5만회 이상의 상업용 등급 마모 테스트로 우수한 내마모성을 검증했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "휴 회전형 라운지 좌식리클라이너 소재 정보" },
        {
          type: "text",
          title: "관리가 편한 기능성 발수 원단",
          body: "생활 발수 기능이 탁월한 기능성 패브릭으로 오염물이 바로 흡수되지 않고 흘러내려 쉬운 관리가 가능합니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "휴 회전형 라운지 좌식리클라이너 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "휴 회전형 라운지 좌식리클라이너 주의사항" },
      ],
    },
  ];
}
