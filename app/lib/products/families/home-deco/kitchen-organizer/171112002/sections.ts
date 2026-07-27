import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171112002";
export const FAMILY_CODE = "171112002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "사용 흔적이 있는 경우 / 오염·훼손된 경우" } },
});

export const notices = createNotices("parcel", "품명: 칼도마 건조대 / 소재: 스테인리스 스틸(STS304), ABS / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "칼과 도마를 한 자리에, 위생 건조대",
          body: "매일 쓰는 칼과 도마를 세워서 말리고 보관하는 일체형 건조대입니다. 주방 톤에 맞춰 화이트와 블랙 2가지 컬러 중 선택할 수 있어 어떤 주방에도 자연스럽게 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "프라임 칼도마 건조대 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "세워서 말리는 통풍 구조",
          body: "칼날과 도마가 서로 닿지 않게 분리 수납되어 물기가 아래로 빠지고 사방으로 통풍됩니다. 눕혀 보관할 때 생기는 물때와 세균 걱정을 구조로 해결했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "프라임 칼도마 건조대 통풍 구조 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "물때에 강한 스테인리스와 무광 코팅",
          body: "뼈대는 녹에 강한 스테인리스, 외관은 지문과 물자국이 덜 보이는 무광 파우더 코팅으로 마감했습니다. 분리 세척이 가능해 언제나 청결하게 유지할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "프라임 칼도마 건조대 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내" },
      ],
    },
  ];
}
