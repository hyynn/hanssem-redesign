import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/curtain-blind/171210002";
export const FAMILY_CODE = "171210002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송기간": "맞춤제작 후 5~7일 내 출고 (주말·공휴일 제외)" } },
  "반품 / 교환 안내": {
    replaceRows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내 (제품 하자에 한함)" },
      { label: "반품·교환 비용", value: "맞춤제작 상품 특성상 단순 변심 반품 불가 / 제품 하자 시 무료 처리" },
      { label: "취소 가능 기간", value: "제작 착수 전(주문 후 24시간 이내) 무료 취소 가능" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 봉제 하자 발생 시 교환 처리" },
    ]
  },
});

export const notices = createNotices("parcel", "품명: 맞춤제작 커튼 / 소재: 폴리에스터 100% 빛조절 원단 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)", {
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
          title: "은은하게 빛을 들이는 내추럴 커튼",
          body: "햇빛을 완전히 막는 대신 부드럽게 걸러 들이는 빛조절 커튼입니다. 가로폭 50cm 단위 맞춤제작으로 우리 집 창에 딱 맞게 주문하고, 화이트와 베이지 두 컬러로 어떤 공간에도 편안하게 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "내추럴 빛조절 코지 커튼 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "낮의 채광과 사생활 보호를 동시에",
          body: "적당한 밀도의 원단이 시선은 가리고 빛은 통과시켜 커튼을 친 낮에도 실내가 어둡지 않습니다. 형광등 없이도 은은한 자연광으로 하루를 보낼 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "내추럴 빛조절 코지 커튼 빛조절 기능" },
        {
          type: "text",
          title: "사계절 커튼",
          body: "속커튼보다 도톰한 두께감으로 사계절 두루 사용하기 좋은 베이직 커튼입니다. 부드러운 채광이 필요한 공간에 단독으로 사용해도 좋고, 속커튼과 레이어드하여 빛차단을 높여 사용하는 것도 추천드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "내추럴 빛조절 코지 커튼 빛조절 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "자연스러운 결의 워싱 가공 원단",
          body: "린넨 느낌의 워싱 가공 폴리에스터 원단으로 자연스러운 구김과 부드러운 드레이프를 냅니다. 물세탁이 가능하고 세탁 후 수축이 적어 관리가 쉽습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "내추럴 빛조절 코지 커튼 소재" },
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
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
