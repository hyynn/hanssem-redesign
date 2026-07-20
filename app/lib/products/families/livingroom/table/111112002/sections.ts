import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/table/111112002";
export const FAMILY_CODE = "111112002";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 20~40분" } },
});

export const notices = createNotices("install", "품명: 높이조절 사이드테이블 / 소재: LPM 상판, 스틸 리프트 프레임 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 60cm 상세" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 60cm 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 기능 설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 소재 설명" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 사이즈" },
      ],
    },
    {
      id: "caution",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "클린트 어반 높이조절 리프트업 사이드테이블 주의사항" },
      ],
    },
  ];
}
