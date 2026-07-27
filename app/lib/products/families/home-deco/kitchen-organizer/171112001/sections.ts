import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171112001";
export const FAMILY_CODE = "171112001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "조립·사용 흔적이 있는 경우 / 오염·훼손된 경우" } },
});

export const notices = createNotices("parcel", "품명: 식기건조대 / 소재: 스테인리스 스틸(STS304) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "전체를 스테인리스로 완성한 2단 식기건조대",
          body: "물이 닿는 모든 부분을 스테인리스로 마감한 올스텐 2단 식기건조대입니다. 녹슬 걱정 없이 오래 쓰고, 2단 구조로 좁은 싱크대 위 공간을 두 배로 활용합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "올스텐 라이프 2단 식기건조대 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "설거지 동선을 줄이는 수납 설계",
          body: "상단은 접시와 볼, 하단은 컵과 수저까지 자리를 나눠 건조와 수납을 한 번에 해결합니다. 물받이 트레이는 앞으로 빼서 통째로 비울 수 있어 물때 관리가 간편합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "올스텐 라이프 2단 식기건조대 수납 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "올스텐 라이프 2단 식기건조대 소재" },
        {
          type: "text",
          title: "녹에 강한 304 스테인리스",
          body: "식기가 닿는 전 부위에 부식에 강한 304 스테인리스를 사용해 물기 많은 싱크대 환경에서도 위생적으로 사용할 수 있습니다. 용접 부위를 매끄럽게 연마해 물때가 낄 틈을 줄였습니다.",
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
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 용접 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
