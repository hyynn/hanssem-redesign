import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "bedroom/mattress/101112001";
export const FAMILY_CODE = "101112001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송방법": "택배 배송", "배송기간": "결제 후 3~5 영업일 이내", "배송지역": "전국 배송 (제주·도서산간 지역 추가 배송비 발생)", "배송 안내": "부피 상품으로 배송 시 압축 포장되어 발송됩니다. 개봉 후 자연 복원되며 완전 복원까지 24~48시간 소요됩니다." } },
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "비닐 포장 개봉 후 / 사용·오염·훼손된 경우", "A/S": "한샘 고객센터 1688-4945" } },
});

export const notices = createNotices("parcel", "품명: 토퍼 / 소재: 메모리폼, 폴리에스터 커버 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)", {
  returns:
    "단순 변심 교환/반품은 상품 수령 후 7일 이내 가능하며, 왕복 배송비는 고객 부담입니다. 위생상 비닐 포장 개봉 후에는 단순 변심 교환/반품이 불가합니다.",
});

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기본정보" },
      ],
    },
    {
      id: "fuction",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기능정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "스테이 리버서블 메모리폼 토퍼 기능정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.mp4`, alt: "스테이 리버서블 토퍼 소재 영상" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "스테이 리버서블 토퍼 소재" },
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
      ],
    },
  ];
}
