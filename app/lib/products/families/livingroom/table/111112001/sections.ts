import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/table/111112001";
export const FAMILY_CODE = "111112001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "택배 배송" },
      { label: "배송기간", value: "결제 후 2~4일 이내 순차 배송" },
      { label: "배송비", value: "무료" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "소형 가구로 택배 배송되며, 조립이 필요합니다. 동봉된 조립 설명서를 참고해 주세요." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "조립 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "재크 400 라운드 사이드테이블 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "재크 400 라운드 사이드테이블 기능 설명" },
        {
          type: "text",
          title: "다양한 공간 활용",
          body: "소파 옆, 침대 옆 어느 공간에서든 어울림이 좋아요. 이동이 간편한 컴팩트한 사이즈로 부담없이 활용해보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "재크 400 라운드 사이드테이블 기능 설명" },
        {
          type: "text",
          title: "손쉬운 조립 구성",
          body: "상판, 바닥판, 연결파이프 기둥의 단순한 3가지 구성으로 누구나 쉽고 간편하게  테이블을 완성시킬 수 있어요 조립설명서와 부자재가 동봉되어 있습니다.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "재크 400 라운드 사이드테이블 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "재크 400 라운드 사이드테이블 사이즈" },

      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "재크 400 라운드 사이드테이블 품질보증" },
      ],
    },
  ];
}
