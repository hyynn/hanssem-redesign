import type { ProductDetailSection } from "@/app/lib/types";
import { DIRECT_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "bedroom/mattress/101111001";
export const FAMILY_CODE = "101111001";

export const deliveryGuides = DIRECT_DELIVERY;

export const notices = createNotices("direct", "품명: 매트리스 / 소재: 포켓스프링, 폴리우레탄 폼, 폴리에스터 원단 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "유로탑 매트리스",
          body: "지지력있는  미디움하드타입 포켓스프링 위에 하드타입 일체형 토퍼를 더한 균형감 있는 매트리스. 적당히 탄탄하고 폭신한 내장재의 레이어로 균형감 있는 편안한 수면을 제공합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "밸런스S 유로탑 매트리스 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "특허받은 자체설계 그라데이션 스프링",
          body: "밸런스 매트리스는 그라데이션 설계가 적용되었으며 이는 유연한 컴포트존과 단단한 서포트존을 하나의 스프링에 설계한 한샘만의 특허받은 기술입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "밸런스S 유로탑 매트리스 기본정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "밸런스S 유로탑 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "밸런스S 유로탑 소재" },
        {
          type: "text",
          title: "쾌적한 숙면을 위한 에어폼 레이어링과 텐셀 원단",
          body: "에어폼 내부의 공기 통로가 공기의 순환을 도와주고 유아 의류에도 사용하는 텐셀 소재는 수면 동안 흘리는 땀을 빠르게 건조해 쾌적한 수면 환경을 만들어 줍니다.",
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
          title: "15년 스프링 무상보증",
          body: "매트리스 핵심 자재인 스프링에 대하여 8만회의 누름 테스트, 10만회의 구름 테스트를 거쳤으며, 15년의 무상보증을 제공합니다.",
        },
      ],
    },
  ];
}
