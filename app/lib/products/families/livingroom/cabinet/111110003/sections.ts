import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/cabinet/111110003";
export const FAMILY_CODE = "111110003";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 40~70분" } },
});

export const notices = createNotices("install", "품명: 거실장 / 소재: LPM(E0 등급 친환경 보드), 플리츠 도어 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "플리츠 거실장 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "실용적인 분리 수납 공간",
          body: "리모컨 사용을 위한 도어 오픈 수납시 균형감있는 비례미를 보여주며, 닫았을 때는 깔끔하고 플리츠만의 와이드한 디자인 오브제로 연출할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "플리츠 거실장 기능 설명" },

        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "플리츠 거실장 기능 설명" },
        {
          type: "text",
          title: "실용적인 전선 홀",
          body: "전선 홀이 있어 오픈 수납 공간에는 셋톱박스, VOD 등의 수납이 용이하며, 이동선반 뒷면에는 공간이 있어 선반 하부에도 기기수납이 가능합니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "플리츠 거실장 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "플리츠 거실장 품질보증" },
        {
          type: "text",
          title: "안심하고 사용하는 거실장",
          body: "KS 품질 관리 기준 및 한샘 테스트를 모두 통과한 제품과 E0 등급의 안전한 자재를 사용하여 가족 구성원 모두가 안심하고 사용할 수 있습니다.",
        },
      ],
    },
  ];
}
