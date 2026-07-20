import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "bedroom/dresser/101210001";
export const FAMILY_CODE = "101210001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송기간": "주문 후 3~4주 내 순차 배송 (사전판매 상품)" } },
  "설치 서비스 안내": { rows: { "주의사항": "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다." } },
});

export const notices = createNotices("install", "품명: 화장대 / 소재: LPM(E0 등급 친환경 보드), 강화유리 상판 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "트렌디한 컬러 조합의 미니멀한 디자인",
          body: "모노 화이트는 샌드 질감의 화이트 컬러에 톤 다운된 뉴트럴 컬러의 무광 손잡이로 고급감을 높였습니다. 모노 차콜은 샌드 질감의 차콜 컬러에 광택감이 느껴지는 건메탈 손잡이를 적용해 유니크한 세련미를 더했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모노 화장대 디자인" },
        {
          type: "text",
          title: "사용자를 배려한 효율적인 수납 공간",
          body: "화장대 서랍 속 분리된 공간에는 화장품, 액세서리 등 수납물을 깔끔하게 정리할 수 있습니다. (서랍 권장 하중 5kg)",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "모노 화장대 수납" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "소재 안내" },
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
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "한샘 모노 화장대 품질보증 비디오" },
        {
          type: "text",
          title: "안심하고 사용하는 한샘 화장대",
          body: "EO 등급의 안전한 자재와 KC 인증받은 전자기기 부품으로 유해물질, 전자파 걱정 없이 사용할 수 있습니다.",
        },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증" },
      ],
    },
  ];
}
