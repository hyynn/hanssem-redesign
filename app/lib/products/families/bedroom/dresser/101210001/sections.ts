import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/dresser/101210001";
export const FAMILY_CODE = "101210001";

export const deliveryGuides: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "주문 후 3~4주 내 순차 배송 (사전판매 상품)" },
      { label: "배송비", value: "무료 (제주도 15,000원 선불)" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 추가 배송비 발생)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다. 설치 완료 후 포장재를 수거 및 처리해 드립니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (전문 설치팀 방문 설치)" },
      { label: "설치 소요시간", value: "약 30~60분" },
      { label: "주의사항", value: "설치 장소까지의 운반 경로(계단·복도·문틈) 확인이 필요합니다." },
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
          title: "트렌디한 컬러 조합의 미니멀한 디자인",
          body: "모노 화이트는 샌드 질감의 화이트 컬러에 톤 다운된 뉴트럴 컬러의 무광 손잡이로 고급감을 높였습니다. 모노 차콜은 샌드 질감의 차콜 컬러에 광택감이 느껴지는 건메탈 손잡이를 적용해 유니크한 세련미를 더했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모노 화장대 디자인" },
        {
          type: "text",
          title: "사용자를 배려한 효율적인 수납 공간",
          body: "화장대 서랍 속 분리된 공간에는 화장품, 액세서리 등 수납물을 깔끔하게 정리할 수 있습니다. (서랍 권장 하중 5kg)",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "모노 화장대 수납" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "소재 안내" },
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
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "한샘 모노 화장대 품질보증 비디오" },
        {
          type: "text",
          title: "안심하고 사용하는 한샘 화장대",
          body: "EO 등급의 안전한 자재와 KC 인증받은 전자기기 부품으로 유해물질, 전자파 걱정 없이 사용할 수 있습니다.",
        },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증" },
      ],
    },
  ];
}
