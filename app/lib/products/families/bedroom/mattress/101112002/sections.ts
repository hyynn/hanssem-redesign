import type { ProductDetailSection } from "@/app/lib/types";
import { DIRECT_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "bedroom/mattress/101112002";
export const FAMILY_CODE = "101112002";

export const deliveryGuides = withDeliveryOverrides(DIRECT_DELIVERY, {
  "설치 서비스 안내": null,
});

export const notices = createNotices("direct", "품명: 하단 매트리스 / 소재: 본넬스프링, 폴리에스터 원단 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "컴포트 하단 매트리스 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "컴포트 하단 매트리스 기본정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "컴포트 하단 매트리스 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-02.webp`, alt: "품질보증 안내 QnA" },
      ],
    },
  ];
}
