import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/table/121014001";
export const FAMILY_CODE = "121014001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송 안내": "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 다리 조립 및 설치 완료 후 포장재를 수거 및 처리해 드립니다." } },
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 20~30분" } },
});

export const notices = createNotices("install", "품명: 원목 식탁 / 소재: 오크 원목 상판, 원목 다리 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "부드러운 반타원 라인의 원목 2인 식탁",
          body: "미나 내추럴 반타원 식탁은 모서리를 둥글게 다듬은 반타원 상판으로, 좁은 공간에서도 동선에 걸리지 않는 2인용 식탁입니다. 원목 특유의 자연스러운 결이 공간에 따뜻함을 더합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "1000mm 폭, 자취·신혼 부부에게 알맞은 크기",
          body: "가로 1000mm의 컴팩트한 사이즈로 원룸이나 소형 주방에도 부담 없이 배치할 수 있습니다. 반타원 형태라 통행 동선에서 모서리에 부딪힐 걱정이 적습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 공간 활용" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "검증된 품질의 LPM 소재",
          body: "음식물, 필기구 등에 의한 오염 관리가 쉬우며 생활 스크래치에 강한 LPM 소재를 적용했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "미나 내추럴 반타원 2인 1000 식탁 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원목 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 마감 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
      ],
    },
  ];
}
