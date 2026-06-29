import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/mattress/101112001";
export const FAMILY_CODE = "101112001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "택배 배송" },
      { label: "배송기간", value: "결제 후 3~5 영업일 이내" },
      { label: "배송비", value: "구매금액 50,000원 이상 무료 / 미만 시 3,000원" },
      { label: "배송지역", value: "전국 배송 (제주·도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "부피 상품으로 배송 시 압축 포장되어 발송됩니다. 개봉 후 자연 복원되며 완전 복원까지 24~48시간 소요됩니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "비닐 포장 개봉 후 / 사용·오염·훼손된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945" },
    ],
  },
];

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기본정보" },
      ],
    },
    {
      id: "fuction",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기능정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기능정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.mp4`, alt: "스테이 리버서블 토퍼 소재 영상" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "스테이 리버서블 토퍼 소재" },
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
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증 안내" },
      ],
    },
  ];
}
