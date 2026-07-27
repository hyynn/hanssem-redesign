import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/curtain-blind/171210003";
export const FAMILY_CODE = "171210003";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송기간": "맞춤제작 후 5~7일 내 출고 (주말·공휴일 제외)" } },
  "반품 / 교환 안내": { replaceRows: [
    { label: "반품·교환 기간", value: "상품 수령 후 7일 이내 (제품 하자에 한함)" },
    { label: "반품·교환 비용", value: "맞춤제작 상품 특성상 단순 변심 반품 불가 / 제품 하자 시 무료 처리" },
    { label: "취소 가능 기간", value: "제작 착수 전(주문 후 24시간 이내) 무료 취소 가능" },
    { label: "A/S", value: "한샘 고객센터 1688-4945 / 봉제 하자 발생 시 교환 처리" },
  ] },
});

export const notices = createNotices("parcel", "품명: 맞춤제작 암막 커튼 / 소재: 폴리에스터 100% 3중직 암막 원단 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)", {
  preCheck:
    "가로폭 단위로 맞춤 제작되어 택배로 배송되는 상품입니다. 주문 전 창 실측 치수를 반드시 확인해 주세요. 모니터 환경에 따라 실제 색상과 다소 차이가 있을 수 있습니다.",
  returns:
    "맞춤제작 상품 특성상 단순 변심 교환/반품이 불가합니다. 제작 착수 전(주문 후 24시간 이내)에는 무료 취소 가능하며, 제품 하자의 경우 무료 처리됩니다.",
});

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "빛 한 줄기 없이, 3중직 완벽암막 커튼",
          body: "원단 사이에 검은 실을 짜 넣은 3중직 구조로 한낮에도 침실을 깜깜하게 만드는 완벽암막 커튼입니다. 앞뒤 컬러가 다른 양면 디자인이라 실내에서는 밝은 면을, 창밖에서는 차분한 면을 보여줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "완벽암막 릴렉스 3중직 양면 커튼 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "암막률 99.9%의 숙면 환경",
          body: "3중직 원단이 빛을 차단하는 동시에 외풍과 소음도 줄여줍니다. 교대 근무나 늦잠이 필요한 주말, 아이 낮잠 시간까지 시간에 구애받지 않는 수면 환경을 만듭니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "완벽암막 릴렉스 3중직 양면 커튼 암막 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "완벽암막 릴렉스 3중직 양면 커튼 소재" },
        {
          type: "text",
          title: "코팅 없이 직조로 만든 암막",
          body: "화학 코팅 대신 원단 조직 자체로 암막을 구현해 빳빳하지 않고 부드럽게 떨어집니다. 코팅 벗겨짐이 없어 물세탁 후에도 암막 성능이 그대로 유지됩니다.",
        },
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
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
