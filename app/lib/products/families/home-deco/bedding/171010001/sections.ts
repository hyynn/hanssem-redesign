import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/bedding/171010001";
export const FAMILY_CODE = "171010001";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 베개솜 / 충전재: 폴란드산 구스 다운·페더 / 커버: 면 100% / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(kind: "이불솜" | "베개솜"): ProductDetailSection[] {
  const isDuvet = kind === "이불솜";
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: isDuvet ? "사계절 내내 덮는 폴란드 구스 이불솜" : "구름 위에 눕는 폴란드 구스 베개솜",
          body: isDuvet
            ? "세계 3대 구스 산지로 꼽히는 폴란드산 거위 다운을 채운 사계절 이불솜입니다. 가볍지만 뛰어난 보온력과 통기성으로 겨울엔 따뜻하게, 여름엔 쾌적하게 일 년 내내 함께합니다."
            : "폴란드산 거위 다운을 넉넉하게 채워 머리를 구름처럼 감싸는 프리미엄 베개솜입니다. 다운 특유의 복원력으로 오래 사용해도 볼륨이 유지되며, 호텔 스위트룸의 잠자리를 그대로 옮겨옵니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: `오리지널 사계절 폴란드 구스 ${kind} 기본정보` },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "온도와 습도를 스스로 조절하는 구스 다운",
          body: "다운 볼 사이의 공기층이 체온에 맞춰 열을 머금고 내보내며, 흡습·방습을 반복해 이불 속 환경을 쾌적하게 유지합니다. 사계절 어느 계절에도 덥거나 춥지 않은 이유입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: `오리지널 사계절 폴란드 구스 ${kind} 기능` },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: `오리지널 사계절 폴란드 구스 ${kind} 소재` },
        {
          type: "text",
          title: "폴란드산 구스 다운과 다운프루프 원단",
          body: "혹한의 폴란드에서 자란 거위의 솜털은 다운 볼이 크고 필파워가 높아 적은 양으로도 풍성한 볼륨을 냅니다. 촘촘한 다운프루프 순면 원단이 깃털 빠짐을 막아줍니다.",
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
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
