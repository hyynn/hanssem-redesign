import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121111001";
export const FAMILY_CODE = "121111001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송 안내": "다리는 간단한 조립이 필요하며, 기본 조립 공구가 함께 제공됩니다." } },
});

export const notices = createNotices("parcel", "품명: 바체어 / 소재: 인조가죽 시트, 스틸 프레임 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "가죽 시트로 완성한 높이감 있는 바체어",
          body: "허드 가죽 바체어는 아일랜드 식탁이나 홈바에 어울리는 높이로 제작된 바체어입니다. 인조가죽 시트가 공간에 고급스러운 인상을 더합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.gif`, alt: "허드 가죽 바체어 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "허드 가죽 바체어 사용 예시" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "허드 가죽 바체어 사이즈 안내" },
      ],
    },
    {
      id: "notice",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "허드 가죽 바체어 주의사항 안내" },
      ],
    },
  ];
}
