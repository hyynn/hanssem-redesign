import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/kitchen-storage/121210002";
export const FAMILY_CODE = "121210002";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 60~120분 (구성에 따라 상이)" } },
});

export const notices = createNotices("install", "품명: 주방수납장 / 소재: LPM(E0 등급 친환경 보드) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

// ── 모디 주방수납 하부장 100cm 수납형 (1212100020) ──
export function createLowerCabinetSections(): ProductDetailSection[] {
  const id = "1212100020";
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "싱크대 아래를 정돈하는 100cm 하부장",
          body: "모디 주방수납 하부장은 싱크대 하부 공간을 수납장으로 확장해 냄비·식기류를 넉넉하게 정리할 수 있는 100cm 폭 제품입니다. 조절 선반으로 원하는 만큼 칸을 나눌 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모디 주방수납 하부장 100cm 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-basic-01.webp`, alt: "모디 주방수납 하부장 100cm 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "일반도어·유리도어 중 선택하는 도어 타입",
          body: "일반도어는 깔끔하게 가려 수납하기 좋고, 유리도어는 안에 무엇이 있는지 한눈에 확인할 수 있습니다. 자주 쓰는 그릇은 유리도어 쪽에 배치하면 동선이 줄어듭니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-function-01.webp`, alt: "모디 주방수납 하부장 100cm 도어 타입" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "친환경 등급의 LPM 마감",
          body: "E0 등급 친환경 보드에 LPM 필름을 마감해 유해물질 걱정 없이 사용할 수 있습니다. 물기가 많은 싱크대 하부에서도 변형 없이 오래 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모디 주방수납 하부장 100cm 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-material-01.webp`, alt: "모디 주방수납 하부장 100cm 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-size-01.webp`, alt: "모디 주방수납 하부장 100cm 사이즈 안내" },
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
          body: "KC 안전기준을 통과한 소재와 설치 품질 검사를 거친 제품입니다. 수령 후 도어 뒤틀림 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}

// ── 모디 주방수납 카페장 100cm 가전형 (1212100021) ──
export function createCafeApplianceSections(): ProductDetailSection[] {
  const id = "1212100021";
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "소형가전을 위한 100cm 카페장",
          body: "모디 주방수납 카페장 가전형은 전자레인지·커피머신 같은 소형가전을 올려두기 좋은 100cm 폭 카페장입니다. 상부장에 가전을 두고 하부는 수납으로 활용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-basic-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "상부장 타입에 따라 달라지는 활용도",
          body: "선반형은 기본 수납, 오픈형은 자주 쓰는 소품을 바로 꺼낼 수 있는 개방형 구조, 슬라이딩형은 도어를 옆으로 밀어 여는 방식입니다. 주방 동선과 사용 빈도에 맞춰 선택할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-function-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 상부장 타입" },
        {
          type: "text",
          title: "고정형으로 완성한 넉넉한 하부 수납",
          body: "가전형은 상부장의 가전 수납 기능에 특화된 구성이라 하부장은 타입 선택 없이 기본 도어형으로 제공되며, 무거운 조리도구나 냄비류를 안정적으로 보관할 수 있습니다. 도어 타입을 직접 고르고 싶다면 일반도어·유리도어를 선택할 수 있는 미니멀한 구성의 수납형을 추천드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-function-02.webp`, alt: "모디 주방수납 카페장 100cm 가전형 하부장" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "친환경 등급의 LPM 마감",
          body: "E0 등급 친환경 보드에 LPM 필름을 마감해 유해물질 걱정 없이 사용할 수 있습니다. 가전 사용 시 발생하는 열과 습기에도 변형이 적습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-material-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-size-01.webp`, alt: "모디 주방수납 카페장 100cm 가전형 사이즈 안내" },
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
          body: "KC 안전기준을 통과한 소재와 설치 품질 검사를 거친 제품입니다. 수령 후 도어 뒤틀림 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}

// ── 모디 주방수납 카페장 100cm 수납형 (1212100022) ──
export function createCafeStorageSections(): ProductDetailSection[] {
  const id = "1212100022";
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "상하부 수납을 모두 갖춘 100cm 카페장",
          body: "모디 주방수납 카페장 수납형은 상부장과 하부장을 모두 갖춰 수납량을 극대화한 100cm 폭 카페장입니다. 홈카페 용품부터 식기까지 한 곳에 정리할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-basic-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "상부장·하부장 타입을 각각 선택",
          body: "상부장은 선반형·오픈형·슬라이딩형 중에서, 하부장은 일반도어·유리도어 중에서 각각 고를 수 있습니다. 위아래 구성을 원하는 대로 조합해 나만의 카페장을 완성할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-function-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 상부 구성" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-function-02.webp`, alt: "모디 주방수납 카페장 100cm 수납형 하부 구성" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [

        {
          type: "text",
          title: "친환경 등급의 LPM 마감",
          body: "E0 등급 친환경 보드에 LPM 필름을 마감해 유해물질 걱정 없이 사용할 수 있습니다. 상하부 모두 동일한 마감으로 통일감 있는 주방을 완성합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-material-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${id}/${id}-size-01.webp`, alt: "모디 주방수납 카페장 100cm 수납형 사이즈 안내" },
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
          body: "KC 안전기준을 통과한 소재와 설치 품질 검사를 거친 제품입니다. 수령 후 도어 뒤틀림 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
