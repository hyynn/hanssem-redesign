import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/chair/121111002";
export const FAMILY_CODE = "121111002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송비": "구매금액 50,000원 이상 무료 / 미만 시 3,000원" } },
});

export const notices = createNotices("parcel", "품명: 바체어 / 소재: 스틸 프레임(분체도장) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "납작한 판을 접어 만든 플랫 프레임 바체어",
          body: "유로 501 플랫 바체어는 하나의 철판을 절곡해 완성한 플랫 프레임이 특징인 바체어입니다. 군더더기 없는 실루엣이 인더스트리얼한 공간에 잘 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "유로 501 플랫 바체어 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "여러 개 겹쳐 보관 가능한 스택형 구조",
          body: "동일한 형태의 프레임이라 여러 개를 겹쳐 세워 보관할 수 있어 공간 활용에 유리합니다. 가벼워서 이동도 손쉽습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "유로 501 플랫 바체어 사용 예시" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "유로 501 플랫 바체어 사이즈 안내" },
      ],
    },
    {
      id: "notice",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "유로 501 플랫 바체어 주의사항 안내" },
      ],
    },
  ];
}
