import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121110001";
export const FAMILY_CODE = "121110001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송 안내": "다리는 간단한 조립이 필요하며, 기본 조립 공구가 함께 제공됩니다." } },
});

export const notices = createNotices("parcel", "품명: 식탁의자 / 소재: 원목 프레임, 패브릭 시트 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "가늘고 슬림한 라인의 식탁의자",
          body: "도노 슬림 식탁의자는 얇게 다듬은 원목 프레임으로 시각적으로 가벼운 인상을 주는 식탁의자입니다. 2개입 구성으로 한 번에 짝을 맞춰 배치할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "도노 슬림 식탁의자 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "좁은 다이닝 공간에도 부담 없는 슬림 라인",
          body: "얇은 다리와 등받이 프레임 덕분에 여러 개를 나란히 두어도 공간이 답답해 보이지 않습니다. 시트는 적당한 쿠션감으로 오래 앉아도 편안합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "도노 슬림 식탁의자 사용 예시" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "도노 슬림 식탁의자 기능 안내" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "원목 프레임과 패브릭 시트",
          body: "프레임은 단단한 원목으로 제작해 무게를 지탱하는 내구성을 확보했고, 시트는 오염에 강한 패브릭으로 마감해 관리가 편합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "도노 슬림 식탁의자 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "도노 슬림 식탁의자 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "도노 슬림 식탁의자 사이즈 안내" },
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
          body: "KC 안전기준을 통과한 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 프레임 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
