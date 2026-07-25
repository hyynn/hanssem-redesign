import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121110003";
export const FAMILY_CODE = "121110003";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원", "배송 안내": "다리는 간단한 조립이 필요하며, 기본 조립 공구가 함께 제공됩니다." } },
});

export const notices = createNotices("parcel", "품명: 식탁의자 / 소재: 스틸 프레임, 부클 패브릭 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "포근한 부클 소재의 라운드 식탁의자",
          body: "위드 라운드 식탁의자는 몽글몽글한 부클 패브릭을 감싼 둥근 등받이가 특징인 식탁의자입니다. 2개입 구성으로 짝을 맞춰 배치하기 좋습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "위드 라운드 식탁의자 기본정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "스틸 프레임과 부클 패브릭",
          body: "프레임은 단단한 스틸로 제작해 무게를 안정적으로 지탱하며, 시트는 보풀이 잘 일지 않는 부클 패브릭으로 마감해 포근한 촉감을 오래 유지합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "위드 라운드 식탁의자 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "위드 라운드 식탁의자 사이즈 안내" },
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
