import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/sofa/111012001";
export const FAMILY_CODE = "111012001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "주문 후 3~4주 내 순차 배송 (사전판매 상품)" },
      { label: "배송비", value: "구매금액 50,000원 이상 무료 / 미만 시 3,000원" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 배송 불가)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 설치)" },
      { label: "설치 소요시간", value: "약 30~60분" },
      { label: "주의사항", value: "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." },
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

export function createSections(opts: { variantId: string; leadCount?: number }): ProductDetailSection[] {
  const { variantId, leadCount = 1 } = opts;

  const leadBlocks: ProductDetailSection["blocks"] = Array.from({ length: leadCount }, (_, i) => ({
    type: "image" as const,
    src: `/images/products/${FAMILY_PATH}/${variantId}/${variantId}-basic-lead-${String(i + 1).padStart(2, "0")}.webp`,
    alt: "모아 소파 기본정보",
  }));

  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        ...leadBlocks,
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-shared-01.webp`, alt: "모아 소파 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-shared-02.webp`, alt: "모아 소파 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "모아 소파 기능 설명" },
        {
          type: "text",
          title: "따로, 또 같이",
          body: "모듈형 소파로 쉽게 이동이 가능해 다양한 인테리어를 연출합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "모아 소파 기능 설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모아 소파 소재 설명" },
        {
          type: "text",
          title: "유럽 친환경 인증 소재",
          body: "약 100여가지에 달하는 다양한 상황별 유해성 테스트를 통과해 OEKO TEX STANDARD 100을 부여받았습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.gif`, alt: "모아 소파 소재 설명" },
        {
          type: "text",
          title: "생활 발수 기능으로 손쉬운 관리",
          body: "생활 발수 기능이 탁월한 기능성 패브릭으로 오염물이 바로 흡수되지 않고 흘러내려 쉬운 관리가 가능합니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "모아 소파 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "모아 소파 품질보증" },
      ],
    },
  ];
}
