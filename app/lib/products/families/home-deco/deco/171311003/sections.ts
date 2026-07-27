import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171311003";
export const FAMILY_CODE = "171311003";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 러그 / 소재: 폴리에스터 100%(터프팅 파일 25mm), 논슬립 바닥면 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "발이 빠지는 폭신함, 프라임 터프팅 투톤 러그",
          body: "25mm 도톰한 파일이 발을 폭 감싸는 터프팅 러그입니다. 두 가지 색을 짜 넣은 투톤 패턴이 밋밋한 바닥에 깊이를 더하고, 베이지&블랙과 그레이&카키 두 조합 중 공간 톤에 맞게 선택할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "프라임 터프팅 투톤 러그 25mm 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "25mm 파일이 만드는 쿠션감과 방음",
          body: "촘촘하게 심은 25mm 파일층이 걸을 때마다 푹신하게 눌리며 발소리와 생활 소음을 흡수합니다. 소파 아래 깔면 앉은 자리의 보온성까지 챙길 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "프라임 터프팅 투톤 러그 쿠션·방음 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.gif`, alt: "프라임 터프팅 투톤 러그 소재" },
        {
          type: "text",
          title: "복원력 좋은 고밀도 터프팅 파일",
          body: "가구에 눌려도 빗질 한 번이면 되살아나는 고밀도 폴리에스터 파일을 사용했습니다. 바닥면은 미끄럼 방지 부직포로 마감해 별도 패드 없이 바로 깔 수 있습니다.",
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
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 원단과 봉제 품질 검사를 거친 제품입니다. 수령 후 봉제 불량 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },
      ],
    },
  ];
}
