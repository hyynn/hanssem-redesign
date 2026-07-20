import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/table/121012001";
export const FAMILY_CODE = "121012001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송방법": "한샘배송 (전문 배송팀 조립·설치 포함)", "배송 안내": "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 식탁·벤치·의자 조립 및 설치 완료 후 포장재를 수거 및 처리해 드립니다." } },
  "설치 서비스 안내": { rows: { "설치 서비스": "포함 (전문 설치팀 방문 조립·설치)", "설치 소요시간": "약 50~70분", "주의사항": "벤치·코너벤치 구성에 따라 설치 공간이 달라지므로 사전 실측을 권장드립니다." } },
});

export const notices = createNotices("install", "품명: 식탁 세트 / 소재: 고무나무 원목(의자), LPM 상판, 패브릭 벤치 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(basic: { title: string; body: string }): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "text", title: basic.title, body: basic.body },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "포레 컴포트 다이닝세트 기본정보" },
        {
          type: "text",
          title: "벤치형 구성으로 완성하는 여유로운 다이닝",
          body: "원목 의자와 벤치를 함께 구성해 6인이 넉넉하게 앉을 수 있고, 자연스러운 원목 결이 공간에 편안한 분위기를 더합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "포레 컴포트 다이닝세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "벤치 구성 설명" },
        {
          type: "text",
          title: "공간에 맞춰 선택하는 벤치 구성",
          body: "베이직세트는 벤치 1개와 원목의자 2개로, 라운지세트는 벤치 1개와 코너벤치 1개, 원목의자 2개로 구성되어 공간과 인원에 맞게 선택할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "벤치 구성 디테일" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "원목 소재 클로즈업" },
        {
          type: "text",
          title: "자연스러운 결을 살린 원목 마감",
          body: "원목 고유의 결을 살린 마감으로 시간이 지날수록 자연스러운 멋이 더해지며, 내구성이 우수해 오래 사용하기 좋습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내 이미지" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증 안내" },
        {
          type: "text",
          title: "안심하고 사용하는 한샘 다이닝세트",
          body: "EO 등급의 안전한 자재를 사용했으며, 제품 하자 발생 시 1년 내 무상 A/S를 제공합니다.",
        },
      ],
    },
  ];
}
