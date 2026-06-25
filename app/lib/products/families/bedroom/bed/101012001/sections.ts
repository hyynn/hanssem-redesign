import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/bed/101012001";
export const FAMILY_CODE = "101012001";

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

export function createSections(basic: { title: string; body: string }): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        { type: "text", title: basic.title, body: basic.body },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.mp4`, alt: "모노 침대 기본정보 비디오" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "모노 침대 기본정보" },
        {
          type: "text",
          title: "모노톤 컬러감에 어울리는 미니멀한 디자인",
          body: "주거공간에도 어울리는 모노톤에 낮고 와이드한 비례미가 더해져 미니멀한 침실룩을 연출합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-03.webp`, alt: "모노 침대 기본정보 이미지" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "무드조명" },
        {
          type: "text",
          title: "아늑한 공간을 위한 헤드의 무드 조명",
          body: "침대 헤드 위 길게 위치한 바 형태의 무드등은 풍부한 간접조명 효과로 아늑한 분위기의 침실을 연출할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "기능설명" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-03.webp`, alt: "기능설명" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.mp4`, alt: "모노 침대 소재 정보 비디오" },
        {
          type: "text",
          title: "내구성이 강한 LPM 소재",
          body: "LPM 소재로 내구성이 강하고 표면이 매끈하여 관리에 용이하고, 엠보처리로 손자국을 최소화했습니다.",
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
          body: "EO 등급의 안전한 자재와 KC 인증받은 전자기기 부품으로 유해물질, 전자파 걱정 없이 사용할 수 있습니다.",
        },
      ],
    },
  ];
}
