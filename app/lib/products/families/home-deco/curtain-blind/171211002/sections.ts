import type { ProductDetailSection } from "@/app/lib/types";
import { CUSTOM_INSTALL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/curtain-blind/171211002";
export const FAMILY_CODE = "171211002";

export const deliveryGuides = CUSTOM_INSTALL_DELIVERY;

export const notices = createNotices("customInstall", "품명: 암막 롤스크린 / 소재: 폴리에스터 100% 암막 원단, 알루미늄 헤드레일 / 제조국: 대한민국 / KC 인증 완료 / 시공·A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "낮과 밤을 나눠 쓰는 호텔식 더블 롤스크린",
          body: "속커튼 역할의 원단과 암막 스크린을 한 프레임에 담은 BLACK LABEL 더블 롤스크린입니다. 낮에는 은은한 채광, 밤에는 완전한 차광 — 호텔 객실의 이중 커튼 시스템을 블라인드 하나로 구현했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "BLACK LABEL 호텔식 더블 롤스크린 암막 블라인드 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "두 겹의 스크린, 두 가지 무드",
          body: "앞쪽 스크린은 시어솔리드와 펀칭레이스 중 취향에 맞게 선택하고, 뒤쪽 암막 스크린은 필요할 때만 내립니다. 각 스크린이 독립적으로 조작되어 시간대별로 빛을 설계할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "BLACK LABEL 호텔식 더블 롤스크린 이중 스크린 기능" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "BLACK LABEL 호텔식 더블 롤스크린 기능 안내" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "은은한 시어 원단과 고밀도 암막 원단",
          body: "시어솔리드는 부드러운 반투명 질감으로, 펀칭레이스는 섬세한 패턴 사이로 빛이 스미는 타입입니다. 뒤쪽 암막 스크린은 고밀도 코팅 원단으로 야간 차광률을 극대화했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "BLACK LABEL 호텔식 더블 롤스크린 소재" },
      ],
    },
    {
      id: "notice",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "주의사항 안내" },
      ],
    },
  ];
}
