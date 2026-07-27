import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171312003";
export const FAMILY_CODE = "171312003";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 티슈케이스 / 소재: PU가죽, 내부 스틸 프레임, 하단 논슬립 패드 / 제조국: 중국 / KC 안전기준 부합확인 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "호텔 룸의 감성을 담은 가죽패턴 티슈커버",
          body: "각진 스티치 디테일로 마감한 가죽패턴 티슈커버입니다. 각티슈 상자를 감싸는 것만으로 테이블 위 분위기가 호텔 객실처럼 정돈됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "가죽패턴 호텔 티슈커버 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "일반 각티슈 규격에 맞춘 넉넉한 사이즈",
          body: "시중 각티슈 대부분의 규격에 여유 있게 맞도록 설계했습니다. 하단 논슬립 패드가 테이블 위에서 미끄러지지 않게 잡아줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "가죽패턴 호텔 티슈커버 사용 기능" },
        {
          type: "text",
          title: "깔끔한 마무리",
          body: "깔끔한 마감으로 먼지 걱정없이 편안하게 사용하실 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "가죽패턴 호텔 티슈커버 사용 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "고급스러운 스티치의 PU 가죽",
          body: "내구성 좋은 PU 가죽에 정교한 스티치 라인을 더해 고급스러운 인상을 완성합니다. 내부 스틸 프레임이 형태를 오래 유지시켜 줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "가죽패턴 호텔 티슈커버 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "가죽패턴 호텔 티슈커버 소재 상세" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내" },
      ],
    },
  ];
}
