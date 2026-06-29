import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "livingroom/sofa/111011001";
export const FAMILY_CODE = "111011001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "결제 후 5~7일 이내 순차 배송" },
      { label: "배송비", value: "무료 (제주도 15,000원 선불)" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 설치)" },
      { label: "설치 소요시간", value: "약 40~70분" },
      { label: "주의사항", value: "리클라이너 제품 특성상 설치 경로 폭 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "설치 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 2년 내 무상 A/S" },
    ],
  },
];

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "MVME 프라임 노블 천연가죽 리클라이너 소파 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "MVME 프라임 노블 천연가죽 리클라이너 소파 기본정보" },
        {
          type: "text",
          title: "MVME 프라임 노블 천연가죽 리클라이너 소파 시리즈",
          body: "풍성한 등받이 쿠션으로 깊이 있는 편안함을, 베이직한 디자인으로 어느 공간에나 자연스럽게. 스테디셀러 프라임 노블로 여유로운 휴식을 누려보세요.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-03.webp`, alt: "MVME 프라임 노블 천연가죽 리클라이너 소파 기본정보" },
        {
          type: "text",
          title: "기본에 충실한 스테디셀러",
          body: "과하지 않은 부피감과 균형잡힌 비율로 오랜 시간 함께해도 부담 없이, 어떤 공간과도 자연스럽게 어우러집니다.",
        },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "MVME 프라임 노블 리클라이너 기능 설명" },
        {
          type: "text",
          title: "오래 앉아 있어도 걱정 없는 USB 충전포트",
          body: "양쪽 팔걸이 바깥쪽 스위치에 USB 포트가 내장되어 있어, 소파에서도 디지털 기기를 편리하게 충전하며 오랜 시간 머무를 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.gif`, alt: "MVME 프라임 노블 리클라이너 기능 설명" },
        {
          type: "text",
          title: "두 다리 쭉 뻗어도 걱정 없는 발받침",
          body: "리클라이닝 기능 작동 시, 숨겨져 있던 발받침이 길게 뻗어 나와 발목까지 편안하게 받쳐줍니다.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "MVME 프라임 노블 천연가죽 소재 설명" },
        {
          type: "text",
          title: "시간이 지나도 멋스러운 천연소가죽",
          body: "몸이 닿는 부위에 천연소가죽을 사용해 가죽 본연의 부드러운 질감을 느낄 수 있습니다. 내추럴한 텍스처와 은은한 광택이 공간에 차분함을 더하며, 시간이 흐를수록 깊이가 더해집니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "MVME 프라임 노블 천연가죽 소재 설명" },
        {
          type: "text",
          title: "환경 영향까지 고려한 가죽 공정",
          body: "지속가능한 개발을 추구하며, 엄격한 환경 영향 평가를 통과한 기업에게만 부여하는 LWG 인증마크를 획득한 태너리에서 생산되었습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "MVME 프라임 노블 리클라이너 소파 사이즈" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "MVME 프라임 노블 리클라이너 소파 품질보증" },
      ],
    },
  ];
}
