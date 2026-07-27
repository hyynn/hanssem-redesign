import type { ProductDetailSection } from "@/app/lib/types";
import { CUSTOM_INSTALL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/curtain-blind/171210001";
export const FAMILY_CODE = "171210001";

export const deliveryGuides = CUSTOM_INSTALL_DELIVERY;

export const notices = createNotices("customInstall", "품명: 커튼·블라인드 패키지 / 소재: 폴리에스터 100% 원단, 알루미늄 헤드레일 / 제조국: 대한민국 / KC 인증 완료 / 시공·A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(kind: "베이직" | "플러스"): ProductDetailSection[] {
  const rooms = kind === "베이직" ? "거실과 방 2개" : "거실과 방 3개";
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: `집 전체 창을 한 번에, 20평형대 ${kind} 패키지`,
          body: `${rooms}의 창을 실측부터 시공까지 한 번에 해결하는 20평형대 윈도우 패키지입니다. 공간별로 블라인드형과 커튼형 중 선택할 수 있어 거실은 커튼, 방은 블라인드처럼 취향대로 조합합니다.`,
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: `블라인드/커튼 20평형대 ${kind} 패키지 기본정보` },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "실측부터 시공까지 원스톱 서비스",
          body: "전문 기사가 방문해 창 치수를 실측하고, 창 크기에 딱 맞게 제작해 시공까지 마무리합니다. 셀프 측정 오차나 설치 부담 없이 이사 전후 일정에 맞춰 진행할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: `블라인드/커튼 20평형대 ${kind} 패키지 시공 서비스` },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: `블라인드/커튼 20평형대 ${kind} 패키지 시공 서비스` },
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
      id: "notice",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "주의사항 안내" },
      ],
    },
  ];
}
