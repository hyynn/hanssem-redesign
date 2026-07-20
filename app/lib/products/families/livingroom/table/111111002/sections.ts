import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/table/111111002";
export const FAMILY_CODE = "111111002";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 20~40분" } },
});

export const notices = createNotices("install", "품명: 소파테이블 / 소재: LPM 상판, 스틸 다리 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "플래지어 프링글 소파테이블 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "플래지어 프링글 소파테이블 기능 설명" },
        {
          type: "text",
          title: "부드러운 곡선미를 자랑하는 테이블 디자인",
          body: "부드러운 곡선미를 자랑하는 프링글 소파 테이블은 군더더기 없는 심플한 디자인으로 미드센추리 모던 감성을 가득 담았습니다. 매력적인 프링글 소파 테이블을 만나보세요.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "플래지어 프링글 소파테이블 소재 설명" },
        {
          type: "text",
          title: "스크래치와 마모에 강한 고급 LPM 소재 상판",
          body: "유해물질 걱정 없는 고급 LPM 상판은 뛰어난 견고함을 자랑하며 지문, 오염 등의 걱정 없이 안심하고 사용 가능합니다.",
        },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "플래지어 프링글 소파테이블 주의사항" },
      ],
    },
  ];
}
