import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "bedroom/dresser/101212001";
export const FAMILY_CODE = "101212001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 20~40분" } },
});

export const notices = createNotices("install", "품명: 협탁 / 소재: 스틸(분체도장), MDF / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "유로 협탁 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "유로 협탁 기능 설명" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "유로 협탁 기능 설명" },
      ],
    }, {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "유로 협탁 사이즈 서명" },
      ],
    },
    {
      id: "warranty",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "유로 협탁 주의사항" },
      ],
    },
  ];
}
