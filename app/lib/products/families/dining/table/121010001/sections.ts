import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/table/121010001";
export const FAMILY_CODE = "121010001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송 안내": "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 다리 조립 및 설치 완료 후 포장재를 수거 및 처리해 드립니다." } },
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 20~30분" } },
});

export const notices = createNotices("install", "품명: 스틸 식탁 / 소재: 스틸 프레임, MDF 상판(우드 필름 마감) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "슬림한 스틸 프레임의 사각 2인 식탁",
          body: "미나 스틸 사각 식탁은 가늘게 뽑은 스틸 다리와 각진 상판이 만나 군더더기 없는 인상을 주는 2인용 식탁입니다. 좁은 공간에서도 시각적으로 답답하지 않게 자리를 잡습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "미나 스틸 사각 2인 800 식탁 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "800mm 콤팩트 사이즈",
          body: "가로 800mm의 작은 사이즈로 원룸이나 오피스텔 주방에도 부담 없이 놓을 수 있습니다. 스틸 다리 특유의 얇은 두께 덕분에 실제 면적보다 공간이 넓어 보입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "미나 스틸 사각 2인 800 식탁 공간 활용" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "분체도장 스틸 프레임",
          body: "다리는 녹과 스크래치에 강한 분체도장 스틸로 제작해 오래 사용해도 색이 바래지 않습니다. 상판은 우드 필름으로 마감해 스틸의 차가운 느낌을 자연스럽게 중화합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "미나 스틸 사각 2인 800 식탁 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "미나 스틸 사각 2인 800 식탁 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 용접 품질 검사를 거친 제품입니다. 수령 후 도장 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
      ],
    },
  ];
}
