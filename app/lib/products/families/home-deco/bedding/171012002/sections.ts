import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171012002";
export const FAMILY_CODE = "171012002";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 차렵이불세트 / 소재: 모달 혼방(알러지케어 가공), 충전재 마이크로화이바 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "알러지케어 마이크로 모달 차렵이불세트",
          body: "고밀도로 짠 마이크로 모달 원단이 집먼지 진드기 같은 미세 유입을 물리적으로 차단하는 알러지케어 차렵이불세트. 예민한 피부에도 부담 없는 부드러운 촉감으로 사계절 내내 편안하게 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "마이크로 모달 알러지케어 차렵이불세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "약품 처리 없는 물리적 알러지케어",
          body: "화학 가공 대신 원단 조직 자체를 촘촘하게 짜서 알러지 유발 물질의 통과를 막는 방식입니다. 세탁을 반복해도 기능이 떨어지지 않고, 아이 침구로도 안심하고 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "마이크로 모달 알러지케어 차렵이불세트 알러지케어 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "마이크로 모달 알러지케어 차렵이불세트 소재" },
        {
          type: "text",
          title: "실크처럼 매끄러운 모달 혼방 원단",
          body: "너도밤나무에서 추출한 모달 섬유를 혼방해 면보다 매끄럽고 흡습성이 뛰어납니다. 몸에 감기는 드레이프감이 좋아 뒤척임이 많은 분에게도 잘 맞습니다.",
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
