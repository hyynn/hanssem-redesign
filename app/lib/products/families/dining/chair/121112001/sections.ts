import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121112001";
export const FAMILY_CODE = "121112001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 30~50분" } },
});

export const notices = createNotices("install", "품명: 벤치의자 / 소재: 원목 프레임, 패브릭 시트 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(basic: { title: string; body: string; variantId: string }): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "text", title: basic.title, body: basic.body },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.gif`, alt: "리브업 벤치 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "리브업 벤치 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "여럿이 나란히 앉는 넉넉한 좌석",
          body: "일자형 벤치 구조로 개별 의자보다 더 많은 인원이 여유롭게 앉을 수 있습니다. 식탁 옆에 붙여두면 좌석 배치가 한결 유연해집니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "리브업 벤치 사용 예시" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "단단한 원목 프레임과 패브릭 시트",
          body: "프레임은 무게를 안정적으로 지탱하는 원목으로 제작했고, 시트는 오염에 강한 패브릭으로 마감해 관리가 편합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "리브업 벤치 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${basic.variantId}/${basic.variantId}-size-01.webp`, alt: "리브업 벤치 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 조립 품질 검사를 거친 제품입니다. 수령 후 프레임 파손 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
