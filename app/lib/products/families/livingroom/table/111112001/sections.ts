import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/table/111112001";
export const FAMILY_CODE = "111112001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "배송 안내": { rows: { "배송방법": "택배 배송", "배송기간": "결제 후 2~4일 이내 순차 배송", "배송비": "무료", "배송지역": "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)", "배송 안내": "소형 가구로 택배 배송되며, 조립이 필요합니다. 동봉된 조립 설명서를 참고해 주세요." } },
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "조립 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우", "A/S": "한샘 고객센터 1688-4945 / 제품 하자 발생 시 1년 내 무상 A/S" } },
});

export const notices = createNotices("parcel", "품명: 사이드테이블 / 소재: 스틸(분체도장) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "재크 400 라운드 사이드테이블 상세" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "재크 400 라운드 사이드테이블 기능 설명" },
        {
          type: "text",
          title: "다양한 공간 활용",
          body: "소파 옆, 침대 옆 어느 공간에서든 어울림이 좋아요. 이동이 간편한 컴팩트한 사이즈로 부담없이 활용해보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "재크 400 라운드 사이드테이블 기능 설명" },
        {
          type: "text",
          title: "손쉬운 조립 구성",
          body: "상판, 바닥판, 연결파이프 기둥의 단순한 3가지 구성으로 누구나 쉽고 간편하게  테이블을 완성시킬 수 있어요 조립설명서와 부자재가 동봉되어 있습니다.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "재크 400 라운드 사이드테이블 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "재크 400 라운드 사이드테이블 사이즈" },

      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "재크 400 라운드 사이드테이블 품질보증" },
      ],
    },
  ];
}
