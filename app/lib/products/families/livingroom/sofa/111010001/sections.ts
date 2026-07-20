import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "livingroom/sofa/111010001";
export const FAMILY_CODE = "111010001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 30~50분", "주의사항": "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." } },
  "반품 / 교환 안내": { rows: { "A/S": "한샘 고객센터 1688-4945 / 제품 하자 발생 시 2년 내 무상 A/S" } },
});

export const notices = createNotices("install", "품명: 소파 / 소재: 천연가죽(접촉면), 목재 프레임, 웹스프링 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "리도 천연가죽 소파 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "리도 천연가죽 소파 기능정보" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "리도 천연가죽 소파 소재 설명" },
        {
          type: "text",
          title: "MADE IN ITALY",
          body: "리도 소파는 이태리에서 100% 생산 공정이 이루어지는 펠레밀라노 사의 천연 면피 가죽을 사용합니다. 엄격한 기준 아래 이태리 장인의 노하우를 담아 만든 이태리 천연가죽 특유의 깊이 있는 컬러와 텍스처를 느껴보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "리도 천연가죽 소파 소재 설명" },
        {
          type: "text",
          title: "세월을 견디는 뛰어난 내구성",
          body: "가죽이 마모를 잘 견디는지, 유해하지는 않은지, 한샘만의 엄격한 품질 테스트로 철저하게 검증하여 오랫동안 안심하고 사용할 수 있습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "리도 천연가죽 소파 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "리도 천연가죽 소파 품질보증" },
      ],
    },
  ];
}
