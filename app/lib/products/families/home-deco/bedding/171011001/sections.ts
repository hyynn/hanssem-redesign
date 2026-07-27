import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171011001";
export const FAMILY_CODE = "171011001";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 베개솜 / 충전재: 구스필(거위털) / 커버: 면 100% / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "호텔의 푹신함을 담은 구스필 베개솜",
          body: "호텔 베개 특유의 폭 안기는 볼륨감을 구현한 구스필 베개솜입니다. 수면 자세에 맞춰 낮은형과 높은형 2종 중 선택할 수 있어 나에게 맞는 높이로 편안한 잠자리를 완성합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "밸런스 구스필 호텔 베개솜 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "수면 자세에 맞춘 2가지 높이",
          body: "엎드리거나 바로 누워 자는 분께는 낮은형을, 옆으로 누워 자는 분께는 어깨 높이를 받쳐주는 높은형을 권장합니다. 복원력 좋은 충전재가 눌린 뒤에도 볼륨을 빠르게 회복합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "밸런스 구스필 호텔 베개솜 높이 선택 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "밸런스 구스필 호텔 베개솜 소재" },
        {
          type: "text",
          title: "구스 터치의 마이크로 구스필 충전재",
          body: "구스 다운의 부드러움을 재현한 마이크로 구스필 충전재를 촘촘하게 채워 폭신하면서도 꺼짐이 적습니다. 고밀도 순면 커버 원단이 충전재 빠짐을 막아줍니다.",
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
