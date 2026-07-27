import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171310001";
export const FAMILY_CODE = "171310001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "설치·사용 흔적이 있는 경우 / 오염·훼손된 경우", "A/S": "한샘 고객센터 1688-4945 / 전기 부품 하자 발생 시 1년 내 무상 A/S" } },
});

export const notices = createNotices("parcel", "품명: 조명(테이블·플로어 램프 세트) / 소재: 스틸, 패브릭 셰이드 / 정격전압: 220V / 제조국: 중국 / KC 전기용품 안전인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "공간을 작품으로, 뉴 클림트 램프 세트",
          body: "클림트의 화폭에서 모티프를 얻은 아트 글라스 셰이드의 테이블 램프와 플로어 램프 세트입니다. 켜지 않은 낮에는 오브제로, 불을 밝힌 밤에는 스테인드글라스처럼 빛나는 공간의 주인공이 됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "뉴 클림트 램프 세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "자리에 맞춰 밝히는 투 포인트 조명",
          body: "사이드테이블 위 테이블 램프와 소파 곁 플로어 램프가 서로 다른 높이에서 빛을 겹쳐 공간에 깊이를 만듭니다. 각각 개별 스위치로 조작해 무드에 맞게 밝기를 조합할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "뉴 클림트 램프 세트 조명 연출 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "뉴 클림트 램프 세트 소재" },
        {
          type: "text",
          title: "고급스러움이 살아있는 린넨 소재 갓",
          body: "린넨 텍스쳐의 갓은 특유의 아름다운 결이 살아있어 고급스러운 분위기를 연출해줍니다.",
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
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 전기용품 안전기준을 통과한 제품입니다. 소켓·배선 등 전기 부품 하자 발생 시 1년 내 무상 A/S를 제공합니다.",
        },
      ],
    },
  ];
}
