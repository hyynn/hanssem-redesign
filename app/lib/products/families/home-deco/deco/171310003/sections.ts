import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171310003";
export const FAMILY_CODE = "171310003";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "설치·사용 흔적이 있는 경우 / 오염·훼손된 경우", "A/S": "한샘 고객센터 1688-4945 / 전기 부품 하자 발생 시 1년 내 무상 A/S" } },
});

export const notices = createNotices("parcel", "품명: 조명(플로어 램프) / 소재: 스틸(분체도장), 패브릭 셰이드 / 정격전압: 220V / 제조국: 중국 / KC 전기용품 안전인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "공간의 무드를 세우는 조이 플로어 램프",
          body: "가늘고 곧은 스탠드에 반구형 셰이드를 얹은 조이 플로어 램프는 블랙·화이트·베이지 3가지 컬러로 만나볼 수 있습니다. 소파 옆, 침대 곁, 서재 구석 어디에 세워도 공간의 스타일을 살리는 시그니처 실루엣입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "조이 플로어 램프 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "각도 조절로 완성하는 빛의 방향",
          body: "셰이드 헤드가 상하로 회전해 벽을 비추는 간접광부터 책을 비추는 스팟광까지 빛의 방향을 조절합니다. 풋 스위치로 발끝 조작이 가능해 소파에서 일어나지 않아도 됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "조이 플로어 램프 각도 조절 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "조이 플로어 램프 소재" },
        {
          type: "text",
          title: "무광 파우더 코팅 스틸 바디",
          body: "스탠드와 셰이드 모두 지문이 남지 않는 무광 파우더 코팅 스틸로 마감했습니다. 원형 베이스가 낮고 넓게 깔려 러그 위에서도 안정적으로 서 있습니다.",
        },
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
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 전기용품 안전기준을 통과한 제품입니다. 소켓·배선 등 전기 부품 하자 발생 시 1년 내 무상 A/S를 제공합니다.",
        },
      ],
    },
  ];
}
