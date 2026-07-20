import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/sofa/111012001";
export const FAMILY_CODE = "111012001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송기간": "주문 후 3~4주 내 순차 배송 (사전판매 상품)", "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송지역": "전국 배송 (단, 제주도 및 도서산간 지역 배송 불가)" } },
  "설치 서비스 안내": { rows: { "주의사항": "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." } },
});

export const notices = createNotices("install", "품명: 모듈형 소파 / 소재: 패브릭(폴리에스터), 목재 프레임, 웹스프링 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

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
