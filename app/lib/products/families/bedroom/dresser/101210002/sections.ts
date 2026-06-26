import type { ProductDetailSection, DeliveryGuideGroup } from "@/app/lib/types";

export const FAMILY_PATH = "bedroom/dresser/101210002";
export const FAMILY_CODE = "101210002";

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
      { label: "주의사항", value: "벽 고정이 필수입니다. 설치 시 전문 기사가 벽 고정 시공을 진행합니다." },
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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모노 서랍장 디자인" },
        {
          type: "text",
          title: "사용자를 배려한 효율적인 수납 공간",
          body: "매일 입는 속옷, 양말 보관이 쉽도록 1단에는 얕은 서랍을, 두꺼운 니트와 바지를 수납할 수 있게 하단 2·3단 서랍은 16cm 높이의 깊은 서랍을 배치하였습니다.",
        },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.mp4`, alt: "모노 서랍장 수납 시연" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "댐핑레일로 부드럽게, 전도 위험없이 안전하게",
          body: "부드럽게 열리고 천천히 닫히는 댐핑 언더레일을 적용하여 사용성과 안정성을 높였습니다. 바닥에 레벨러가 있어 흔들림 없이 사용 가능하고 간단한 벽 고정을 통해 전도 위험없이 안심하고 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "댐핑레일 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "벽 고정 안내" },
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
        {
          type: "text",
          title: "안심하고 사용하는 한샘 서랍장",
          body: "EO 등급의 안전한 자재와 KC 인증받은 전자기기 부품으로 유해물질, 전자파 걱정 없이 사용할 수 있습니다. 한샘 서랍장은 전도사고 걱정 없이 안전하게 사용할 수 있도록 제품 출시 전 균형 테스트, 서랍 하중 테스트, 윗서랍 하중 테스트를 진행합니다.",
        },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.mp4`, alt: "품질보증 영상" },
        { type: "video", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-02.mp4`, alt: "전도 테스트 영상" },
      ],
    },
  ];
}
