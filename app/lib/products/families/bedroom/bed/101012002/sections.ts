import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/bed/101012002";
export const FAMILY_CODE = "101012002";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "주문 후 3~4주 내 순차 배송 (사전판매 상품)" },
      { label: "배송비", value: "구매금액 50,000원 이상 무료 / 미만 시 3,000원" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 배송 불가)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 설치)" },
      { label: "설치 소요시간", value: "약 90~120분" },
      { label: "주의사항", value: "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 전동 기능 연결을 위해 콘센트 위치를 미리 확인해 주세요. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "설치 완료 후 / 상품 사용·훼손·오염된 경우 / 포장 훼손으로 상품 가치 감소된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 1년 내 무상 A/S" },
    ],
  },
];

export function createSections(basic: { title: string; body: string }): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "text", title: basic.title, body: basic.body },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.mp4`, alt: "룬소프트 침대 기본정보 비디오" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "룬소프트 침대 기본정보" },
        {
          type: "text",
          title: "부드러운 패브릭이 감싸는 풍성한 헤드보드",
          body: "두툼한 쿠션감의 패브릭 헤드보드가 침실 전체에 따뜻하고 럭셔리한 분위기를 더합니다. 호텔 스위트룸에서 영감을 받은 와이드 헤드보드 디자인으로 침실의 중심을 완성합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-03.webp`, alt: "룬소프트 침대 기본정보 이미지" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.mp4`, alt: "리모컨 작동 영상" },
        {
          type: "text",
          title: "리모컨으로 편리하게 각도 조절",
          body: "헤드 각도를 리모컨 하나로 손쉽게 조절할 수 있어, 독서·TV 시청·취침 등 상황에 맞는 자세를 설정할 수 있습니다. 정밀한 모터 시스템으로 소음 없이 부드럽게 움직입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "리모컨 각도 조절 기능" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-03.webp`, alt: "리모컨 구성" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.mp4`, alt: "룬소프트 침대 소재 영상" },
        {
          type: "text",
          title: "고밀도 폼과 프리미엄 패브릭의 조합",
          body: "헤드보드 내부에는 고밀도 폼을 사용해 장시간 기대어도 흐트러짐 없는 탄탄한 쿠션감을 유지합니다. 커버는 통기성이 우수한 프리미엄 패브릭으로 마감되어 포근하면서도 쾌적하게 사용할 수 있습니다.",
        },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "사이즈 안내 이미지" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증 비디오" },
        {
          type: "text",
          title: "안심하고 사용하는 한샘 침대",
          body: "EO 등급의 안전한 자재와 KC 인증받은 전동 부품으로 유해물질, 전자파 걱정 없이 사용할 수 있습니다.",
        },
      ],
    },
  ];
}
