import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/sofa/111010001";
export const FAMILY_CODE = "111010001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "결제 후 5~7일 이내 순차 배송" },
      { label: "배송비", value: "무료 (제주도 15,000원 선불)" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 설치)" },
      { label: "설치 소요시간", value: "약 30~50분" },
      { label: "주의사항", value: "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "설치 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 2년 내 무상 A/S" },
    ],
  },
];

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "리도 천연가죽 소파 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "리도 천연가죽 소파 기능정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "리도 천연가죽 소파 소재 설명" },
        {
          type: "text",
          title: "MADE IN ITALY",
          body: "리도 소파는 이태리에서 100% 생산 공정이 이루어지는 펠레밀라노 사의 천연 면피 가죽을 사용합니다. 엄격한 기준 아래 이태리 장인의 노하우를 담아 만든 이태리 천연가죽 특유의 깊이 있는 컬러와 텍스처를 느껴보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "리도 천연가죽 소파 소재 설명" },
        {
          type: "text",
          title: "세월을 견디는 뛰어난 내구성",
          body: "가죽이 마모를 잘 견디는지, 유해하지는 않은지, 한샘만의 엄격한 품질 테스트로 철저하게 검증하여 오랫동안 안심하고 사용할 수 있습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "리도 천연가죽 소파 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "리도 천연가죽 소파 품질보증" },
      ],
    },
  ];
}
