import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171111002";
export const FAMILY_CODE = "171111002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "밀봉을 개봉해 식품을 담았던 경우 / 오염·훼손된 경우" } },
});

export const notices = createNotices("parcel", "품명: 식품보관용기 / 소재: 트라이탄, 실리콘 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "냉장고 속이 한눈에 보이는 클리어 푸드 컨테이너",
          body: "투명한 트라이탄 소재로 만들어 안에 담긴 건조식품과 밑반찬을 라벨 없이도 한눈에 확인할 수 있는 클리어 푸드 컨테이너입니다. 냉장고 정리부터 팬트리 수납까지 폭넓게 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "클리어 푸드 컨테이너 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "적층까지 고려한 규격화 설계",
          body: "같은 라인업끼리 규격을 맞춰 설계해 냉장고 선반 위에 차곡차곡 쌓아도 안정적으로 정리할 수 있습니다. 뚜껑은 실리콘 패킹으로 밀폐력을 더했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "클리어 푸드 컨테이너 적층 기능" },
        {
          type: "text",
          title: "신선함을 유지하는 용기",
          body: "뚜껑에 부착된 실리콘은 재료의 맛이나 질감이 변하지 않도록 밀폐력을 높여줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "클리어 푸드 컨테이너 적층 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "안전하고 튼튼한 소재, 폴리에틸렌 테레프탈레이트",
          body: "PET(폴리에틸렌 테레프탈레이트)는 무게가 가볍지만 강도와 연성이 우수하여 다양한 용기로 사용되는 소재입니다. 오랜 기간이 지나도 모양의 변형없이 튼튼하게 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "클리어 푸드 컨테이너 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "클리어 푸드 컨테이너 사이즈 안내" },
        {
          type: "text",
          title: "낱개부터 세트까지 다양한 구성",
          body: "기본형 460ml부터 낮은형 2600ml까지 6종 낱개 구성과, 용도별로 조합한 4종 세트 구성 중 필요에 맞게 선택할 수 있습니다.",
        },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재를 사용했으며, 뚜껑 패킹 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
