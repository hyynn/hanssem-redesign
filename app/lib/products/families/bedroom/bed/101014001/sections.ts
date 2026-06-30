import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/bed/101014001";
export const FAMILY_CODE = "101014001";

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
      { label: "설치 소요시간", value: "약 60~90분" },
      { label: "주의사항", value: "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다. 엘리베이터 미설치 건물은 사전 고객센터 문의를 요청드립니다." },
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

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "온 가족이 함께 편안하게, 스테디 컴피 패밀리침대",
          body: "넓은 SS(슈퍼싱글) 사이즈에 부드러운 패브릭 헤드보드를 결합한 패밀리침대입니다. 부모와 아이가 함께 사용하기에 최적화된 너비로, 좁지 않고 여유 있는 수면 환경을 제공합니다. 일반형·와이드헤드형·가드형 세 가지 타입으로 라이프스타일에 맞는 선택이 가능합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "스테디 컴피 패밀리침대 전체 모습" },
        {
          type: "text",
          title: "패밀리 사이즈의 여유로운 수면 공간",
          body: "SS(슈퍼싱글) 사이즈는 일반 싱글보다 약 200mm 넓어 아이와 나란히 누워도 충분한 공간을 확보합니다. 낮은 침상 높이로 아이가 올라오기 쉽고, 매트리스 넘어짐도 걱정 없이 안전합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "스테디 컴피 패밀리침대 라이프스타일 이미지" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "세 가지 타입 비교" },
        {
          type: "text",
          title: "세 가지 타입으로 선택하는 나만의 패밀리침대",
          body: "일반형은 깔끔한 헤드보드로 심플한 침실을 연출합니다. 와이드헤드형은 넓고 풍성한 헤드보드로 등받이 기능을 더해 독서나 영상 감상에 편안합니다. 가드형은 낙상 방지 가드가 내장되어 어린 아이와 함께 사용할 때 안전을 더합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "가드형 낙상방지 기능" },
        {
          type: "text",
          title: "낙상 방지 가드로 안심 수면 (가드형)",
          body: "접이식 사이드 가드가 아이의 수면 중 낙상을 방지합니다. 필요 시 접어 수납할 수 있어 아이가 성장한 후에도 가드 없이 그대로 사용할 수 있습니다.",
        },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "패브릭 헤드보드 소재 클로즈업" },
        {
          type: "text",
          title: "피부에 닿아도 편안한 고밀도 패브릭 헤드보드",
          body: "헤드보드는 보들보들한 고밀도 패브릭 소재로 마감되어, 기대거나 누워도 피부 자극이 없습니다. 프레임 본체는 내구성 높은 LPM 마감으로 흠집과 습기에 강해 오래 깨끗하게 유지됩니다.",
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
        {
          type: "text",
          title: "한샘의 품질 보증",
          body: "KC 인증 자재와 안전 기준을 준수한 부품을 사용합니다. 제품 하자 발생 시 구매일로부터 1년 내 무상 A/S를 제공하며, 한샘 고객센터(1688-4945)를 통해 신속하게 처리해 드립니다.",
        },
      ],
    },
  ];
}
