import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/cabinet/111110001";
export const FAMILY_CODE = "111110001";

export const deliveryGuides = INSTALL_DELIVERY;

export const notices = createNotices("install", "품명: 거실장 / 소재: LPM(E0 등급 친환경 보드), 스틸 다리 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "클린트 어반 거실장 상세" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "클린트 어반 거실장 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "클린트 어반 거실장 기능 설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "클린트 어반 거실장 소재 설명" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "클린트 어반 거실장 사이즈" },
      ],
    },
    {
      id: "caution",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-caution-01.webp`, alt: "클린트 어반 거실장 주의사항" },
      ],
    },
  ];
}
