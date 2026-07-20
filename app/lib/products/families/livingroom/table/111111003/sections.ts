import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/table/111111003";
export const FAMILY_CODE = "111111003";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 30~50분" } },
});

export const notices = createNotices("install", "품명: 리프트업 소파테이블 / 소재: LPM(E0 등급 친환경 보드), 리프트업 스틸 힌지 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "클린트 어반 리프트업 소파테이블 플랩도어형 상세" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "클린트 어반 리프트업 소파테이블 플랩도어형 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "클린트 어반 리프트업 소파테이블 기능 설명" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "클린트 어반 리프트업 소파테이블 기능 설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "클린트 어반 리프트업 소파테이블 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "클린트 어반 리프트업 소파테이블 사이즈" },
      ],
    },
    {
      id: "caution",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-caution-01.webp`, alt: "클린트 어반 리프트업 소파테이블 주의사항" },
      ],
    },
  ];
}
