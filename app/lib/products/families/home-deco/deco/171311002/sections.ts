import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171311002";
export const FAMILY_CODE = "171311002";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 유아용 섬유제품(러그 겸 토퍼) / 소재: 커버 면 100%, 충전재 폴리우레탄 폼 / 제조국: 대한민국 / KC 안전확인 신고 완료(36개월 미만 사용 가능) / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "놀이와 낮잠을 한 장으로, 샘키즈 원형러그 겸 토퍼",
          body: "아이 놀이 공간에는 러그로, 낮잠 시간에는 토퍼로 쓰는 샘키즈 유아용 원형러그입니다. 푹신한 쿠션층이 넘어져도 아프지 않게 받쳐주고, 원형 디자인이 아이 방의 포인트가 됩니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "샘키즈 유아용 원형러그 겸 토퍼 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "아기의 메인 놀이공간",
          body: "오래 놀지 않는 시기지만 침대 외 눕혀 놓을 적당한 공간이 필요해요. 기저귀갈이대에 눕혀두는 것도 잠깐. 아기의 주요 생활, 놀이공간이 되어줍니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "샘키즈 유아용 원형러그 겸 토퍼 쿠션 기능" },
        {
          type: "text",
          title: "아기의 순간을 예쁘게 남겨주세요.",
          body: "군더더기 없는 가장 기본의 디자인으로 아기 성장앨범이나 SNS 업로드용으로 활용이 가능합니다. 부모님 취향대로 아기사진을 예쁘게 남겨주세요!",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "샘키즈 유아용 원형러그 겸 토퍼 쿠션 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "아이 피부에 안심되는 순면 커버",
          body: "피부에 닿는 커버는 유아 안전기준을 통과한 순면 원단으로, 커버를 분리해 세탁할 수 있습니다. 형광증백제와 유해 염료를 쓰지 않아 신생아 공간에도 안심입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "샘키즈 유아용 원형러그 겸 토퍼 소재" },
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
          title: "유아용 섬유제품은 KC 안전확인 신고가 필수입니다.",
          body: "공인된 안전 기준을 통과한 제품인지 꼭 확인하세요. 샘키즈 원형러그 겸 토퍼는 36개월 미만 영유아도 안심하고 사용 가능합니다. 우리 아이를 위한 믿을 수 있는 선택입니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-warranty-01.webp`, alt: "품질보증 안내" },

      ],
    },
  ];
}
