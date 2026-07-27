import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171011002";
export const FAMILY_CODE = "171011002";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 경추 베개솜 / 충전재: 마이크로화이바 / 커버: 폴리에스터 100% / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "목을 받쳐주는 경추 베개솜 2P 세트",
          body: "수면 중 목의 C커브를 자연스럽게 유지하도록 설계된 경추 베개솜 2개 세트입니다. 부부 침실이나 가족 침구 교체에 부담 없는 세트 구성으로, 목과 어깨가 편안한 아침을 만듭니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "슬립다이버 마이크로 경추 베개솜 2P SET 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "경추를 받치는 인체공학 단차 설계",
          body: "목이 닿는 부분은 높게, 뒤통수가 닿는 부분은 낮게 단차를 두어 누웠을 때 경추 라인을 자연스럽게 받쳐줍니다. 어떤 방향으로 뒤척여도 목이 꺾이지 않는 구조입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "슬립다이버 마이크로 경추 베개솜 2P SET 경추 지지 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "슬립다이버 마이크로 경추 베개솜 2P SET 소재" },
        {
          type: "text",
          title: "가볍고 통기성 좋은 마이크로화이바",
          body: "머리카락보다 가는 마이크로화이바 충전재가 부드럽게 머리를 감싸면서도 지지력을 유지합니다. 통기성이 좋아 열이 차지 않고, 세탁기 통세탁이 가능해 위생적으로 관리할 수 있습니다.",
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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
