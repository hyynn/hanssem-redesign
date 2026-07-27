import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171012003";
export const FAMILY_CODE = "171012003";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 차렵이불세트 / 소재: 텐셀 모달 혼방(리버서블), 충전재 마이크로화이바 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "사계절 리버서블 텐셀 모달 차렵이불세트",
          body: "앞뒤 컬러가 다른 리버서블 디자인에 텐셀 모달 혼방 원단을 더한 사계절 차렵이불세트. 계절과 기분에 따라 뒤집기만 하면 침실 분위기가 달라지고, 간절기부터 여름까지 하나로 해결됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "포시즌 리버서블 텐셀 모달 차렵이불세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "뒤집으면 새 침구, 투톤 리버서블",
          body: "양면을 서로 다른 톤으로 마감해 커버 교체 없이 두 가지 무드를 연출할 수 있습니다. 오염이나 세탁 주기에 따라 면을 바꿔 쓰면 침구를 더 오래 쾌적하게 유지할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "포시즌 리버서블 텐셀 모달 차렵이불세트 리버서블 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "포시즌 리버서블 텐셀 모달 차렵이불세트 소재" },
        {
          type: "text",
          title: "온습도를 조절하는 텐셀 모달 혼방",
          body: "유칼립투스에서 추출한 텐셀과 모달을 혼방해 흡습·건조가 빠르고 촉감이 매끄럽습니다. 여름엔 보송하게, 겨울엔 포근하게 이불 속 온습도를 잡아줍니다.",
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
