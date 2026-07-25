import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121112002";
export const FAMILY_CODE = "121112002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송 안내": "다리는 간단한 조립이 필요하며, 기본 조립 공구가 함께 제공됩니다." } },
});

export const notices = createNotices("parcel", "품명: 체어/스툴 / 소재: 부클, 스틸 다리 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "등받이 유무를 선택하는 체어/스툴",
          body: "블랑 체어/스툴은 등받이가 있는 체어 타입과 등받이 없는 스툴 타입 중 원하는 형태를 선택할 수 있는 제품입니다. 좁은 공간에는 스툴, 편안한 착석감이 필요하면 체어를 고르시면 됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "블랑 체어/스툴 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "용도에 맞춰 고르는 두 가지 타입",
          body: "식탁 의자로는 등받이가 있는 체어 타입이, 홈바나 화장대처럼 짧게 앉는 용도로는 스툴 타입이 어울립니다. 두 타입 모두 동일한 다리 구조로 안정감은 동일합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "블랑 체어/스툴 기능 안내" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "포근한 부클 시트와 스틸 다리",
          body: "시트는 부클 소재로 제작해 포근하게 사용할 수 있습니다. 다리는 스틸로 마감해 내구성이 뛰어납니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "블랑 체어/스툴 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "블랑 체어/스툴 소재 안내" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "블랑 체어/스툴 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 시트 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
