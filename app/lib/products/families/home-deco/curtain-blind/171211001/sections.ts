import type { ProductDetailSection } from "@/app/lib/types";
import { CUSTOM_INSTALL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/curtain-blind/171211001";
export const FAMILY_CODE = "171211001";

export const deliveryGuides = CUSTOM_INSTALL_DELIVERY;

export const notices = createNotices("customInstall", "품명: 콤비 블라인드 / 소재: 폴리에스터 100%, 알루미늄 헤드레일 / 제조국: 대한민국 / KC 인증 완료 / 시공·A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "빛의 결을 디자인하는 샤이니 루나 콤비 블라인드",
          body: "은은한 광택 원단과 투명 망사가 교차하는 BLACK LABEL 콤비 블라인드입니다. 실버화이트부터 라이트그레이까지 4가지 컬러로 창을 공간의 오브제로 완성합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "BLACK LABEL 샤이니 루나 콤비 블라인드 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능 및 소재",
      blocks: [
        {
          type: "text",
          title: "한 뼘 단위로 조절하는 채광",
          body: "불투명 원단과 망사 원단의 겹침을 조절해 완전 차광부터 은은한 투광까지 자유롭게 연출합니다. 시선은 가리면서 바깥 풍경은 흐릿하게 남기는 콤비 특유의 채광이 매력입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "BLACK LABEL 샤이니 루나 콤비 블라인드 채광 조절 기능" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "BLACK LABEL 샤이니 루나 콤비 블라인드 기능 및 소재 안내" },
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
          body: "KC 안전기준을 통과한 원단과 부자재로 제작하며, 시공 후 1년간 하자 발생 시 무상 A/S를 제공합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
