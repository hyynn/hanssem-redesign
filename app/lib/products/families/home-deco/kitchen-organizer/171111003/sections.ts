import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171111003";
export const FAMILY_CODE = "171111003";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "사용 흔적이 있는 경우 / 파손·오염된 경우" } },
});

export const notices = createNotices("parcel", "품명: 유리밥용기 / 소재: 강화유리, 실리콘, PP(폴리프로필렌) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "밥 한 끼를 담는 클리어 유리밥용기 3P",
          body: "강화유리로 만들어 냄새와 색이 배지 않는 클리어 유리밥용기입니다. 1인분씩 소분해 냉장·냉동 보관하기 좋은 3개 구성으로, 도시락과 밑반찬 보관에 두루 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "클리어 유리밥용기 3P 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "다용도 활용 가능",
          body: "밥용기, 반찬보관, 소스/간식/밀프렙 등 다양한 용도로 사용이 가능합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "클리어 유리밥용기 다용도 활용 기능" },
        {
          type: "text",
          title: "뛰어난 밀폐력",
          body: "실리콘+소다석회 뚜껑으로 내용물을 단단히 잡아주어 내용물이 쉽게 새지 않습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "클리어 유리밥용기 밀폐기능" },
        {
          type: "text",
          title: "위생적인 사용 및 세척가능",
          body: "유리는 냄새와 색 배임이 적고 세척이 간편해 늘 깨끗하게 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-03.webp`, alt: "클리어 유리밥용기 세척 가능" },
        {
          type: "text",
          title: "전자레인지까지 그대로 사용 가능",
          body: "유리 재질이라 뚜껑만 분리하면 전자레인지에 바로 데울 수 있습니다. 실리콘 패킹이 적용된 뚜껑은 냉장고 안에서도 냄새와 습기를 차단합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-04.webp`, alt: "클리어 유리밥용기 전자레인지 사용" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "스크래치와 착색 걱정 없는 강화유리",
          body: "일반 플라스틱과 달리 스크래치와 색 배임이 거의 없는 강화유리를 사용해 오래 써도 처음의 투명함을 유지합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "클리어 유리밥용기 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "클리어 유리밥용기 소재 안내" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        {
          type: "text",
          title: "320ml / 236ml 두 가지 용량, 3P 구성",
          body: "성인 한 끼 밥공기 분량에는 320ml를, 소분·이유식 용도에는 236ml를 추천합니다. 두 용량 모두 3개씩 구성되어 일주일치 밥을 미리 소분해 두기 좋습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "클리어 유리밥용기 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재를 사용했으며, 유리 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}