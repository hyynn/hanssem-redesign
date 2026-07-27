import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171110001";
export const FAMILY_CODE = "171110001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "사용 흔적이 있는 경우 / 오염·훼손된 경우" } },
});

export const notices = createNotices("parcel", "품명: 수납함 / 소재: PP(폴리프로필렌) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "서랍처럼 밀어 쓰는 슬라이딩박스 수납함",
          body: "싱크대 하부장, 냉장고 옆 틈새, 팬트리 선반까지 자투리 공간을 서랍처럼 정리하는 S.O.K 슬라이딩박스 수납함입니다. 깔끔한 디자인으로 어디에나 잘 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "부드럽게 밀어 여는 슬라이딩 구조",
          body: "박스 안쪽 트레이가 앞뒤로 부드럽게 슬라이딩되어 좁은 공간에서도 안쪽까지 손쉽게 꺼낼 수 있습니다. 같은 규격끼리는 위아래로 안정감 있게 쌓을 수 있어 수납장을 층층이 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 슬라이딩 기능" },
        {
          type: "text",
          title: "두 가지 용도로 사용하는 하단 공간",
          body: "하단에 5cm 여유 공간이 있어 손을 넣어 손잡이처럼 사용할 수 있습니다. 사용하지 않을 때에는 틈새 공간에 자주 사용하는 물건을 넣어 보관할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 하단 공간 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "식품 보관에도 안심되는 PP 소재",
          body: "냉장·냉동 환경에서도 변형이 적은 식품용 PP(폴리프로필렌) 소재를 사용했습니다. 냄새가 잘 배지 않고 물세척이 간편해 위생적으로 관리할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        {
          type: "text",
          title: "M/L 두 가지 사이즈 선택",
          body: "좁은 틈새 수납에는 M 사이즈를, 넉넉한 수납이 필요한 공간에는 L 사이즈를 추천합니다. 구매 전 수납 공간의 안쪽 치수를 먼저 확인해 주세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 사이즈 안내" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-02.webp`, alt: "S.O.K 슬라이딩박스 서랍 수납함 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재를 사용했으며, 슬라이딩 트레이 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
