import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/kitchen-storage/121210003";
export const FAMILY_CODE = "121210003";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 40~60분" } },
});

export const notices = createNotices("install", "품명: 주방수납장 / 소재: LPM(E0 등급 친환경 보드) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(id: string): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "조리 공간 옆을 정리하는 렌지대",
          body: "모디 주방수납 렌지대는 가스레인지·인덕션 옆에 두고 조리도구와 양념을 정리하는 수납장입니다. 상판은 전자레인지 같은 소형가전을 올려두는 자리로도 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모디 주방수납 렌지대 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-basic-01.webp`, alt: "모디 주방수납 렌지대 기본정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "친환경 등급의 LPM 마감",
          body: "E0 등급 친환경 보드에 LPM 필름을 마감해 유해물질 걱정 없이 사용할 수 있습니다. 주방의 특성을 고려해 열과 습기에 강한 마감을 적용했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모디 주방수납 렌지대 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "모디 주방수납 렌지대 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-size-01.webp`, alt: "모디 주방수납 렌지대 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 설치 품질 검사를 거친 제품입니다. 수령 후 도어 뒤틀림 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
      ],
    },
  ];
}
