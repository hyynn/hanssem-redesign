import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121110002";
export const FAMILY_CODE = "121110002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송 안내": "다리는 간단한 조립이 필요하며, 기본 조립 공구가 함께 제공됩니다." } },
});

export const notices = createNotices("parcel", "품명: 식탁의자 / 소재: PP 시트, 스틸 다리 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "둥근 곡선이 매력적인 라운드 식탁의자",
          body: "미나 라운드 식탁의자는 등받이와 시트를 하나로 이은 둥근 곡선 디자인이 특징인 식탁의자입니다. 컬러 선택지가 다양해 다양한 다이닝 공간에 맞춰 고를 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "미나 라운드 식탁의자 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "가볍게 옮기기 좋은 구조",
          body: "PP 소재 시트는 원목 의자보다 가벼워 청소하거나 자리를 옮길 때 부담이 적습니다. 등받이 곡선이 허리를 자연스럽게 받쳐줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "미나 라운드 식탁의자 사용 예시" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "미나 라운드 식탁의자 기능 안내" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "내구성 좋은 PP 시트와 스틸 다리",
          body: "시트는 충격과 스크래치에 강한 PP 소재로 제작해 오래 사용해도 변형이 적습니다. 다리는 스틸로 마감해 안정감과 자연스러운 색감을 함께 살렸습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "미나 라운드 식탁의자 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "미나 라운드 식탁의자 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "미나 라운드 식탁의자 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 시트 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
      ],
    },
  ];
}
