import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171312005";
export const FAMILY_CODE = "171312005";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 쇼핑백 / 소재: 타포린(방수원단), PP 손잡이 / 제조국: 중국 / KC 안전기준 부합확인 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "장바구니로도, 쇼핑백으로도 타포린 백",
          body: "튼튼한 타포린 원단으로 만든 장바구니 겸 쇼핑백입니다. 방수 기능이 있어 장보기부터 나들이 짐 정리까지 다용도로 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "타포린 장바구니 쇼핑백 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "방수 원단으로 짐 걱정 없이",
          body: "물기 있는 채소나 젖은 우산도 부담 없이 담을 수 있는 방수 타포린 원단을 사용했습니다. 튼튼한 PP 손잡이가 무거운 짐도 안정적으로 지탱합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "타포린 장바구니 쇼핑백 방수 기능" },
        {
          type: "text",
          title: "2way 끈으로 다양한 활용",
          body: "손끈, 어깨끈 2가지 타입으로 상황에 맞춰 편하게 이동하세요..",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "타포린 장바구니 쇼핑백 2way 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "찢어짐에 강한 타포린 원단",
          body: "방수 코팅된 타포린 원단이라 물기와 마찰에 강해 장바구니로 매일 사용해도 오래 견딥니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "타포린 장바구니 쇼핑백 소재" },
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
      id: "notice",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "주의사항 안내" },
      ],
    },
  ];
}
