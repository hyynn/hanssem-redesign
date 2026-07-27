import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171311001";
export const FAMILY_CODE = "171311001";

export const deliveryGuides = PARCEL_DELIVERY;

export const notices = createNotices("parcel", "품명: 러그 / 소재: 폴리에스터 100% 슬러브사(워셔블) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "사계절 내내 발끝이 편안한 엠마 슬러브 러그",
          body: "굵기가 불규칙한 슬러브 원사가 만드는 자연스러운 결의 사계절 러그입니다. 아이보리, 애쉬그레이, 웜그레이 세 가지 뉴트럴 톤으로 어떤 거실에도 부드럽게 스며들고, 통째로 세탁기에 돌릴 수 있어 관리 부담이 없습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "엠마 부드러운 사계절 워셔블 슬러브 러그 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "세탁기에 통째로, 워셔블 설계",
          body: "가정용 세탁기 통세탁이 가능하도록 가볍고 빠르게 마르는 구조로 제작했습니다. 음료를 쏟아도, 반려동물이 있어도 세탁 한 번이면 새 러그처럼 돌아옵니다. 바닥면 논슬립 처리로 밀림도 잡았습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "엠마 부드러운 사계절 워셔블 슬러브 러그 워셔블 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "엠마 부드러운 사계절 워셔블 슬러브 러그 소재" },
        {
          type: "text",
          title: "먼지 날림이 적은 슬러브 원사",
          body: "촘촘하게 직조한 슬러브 원사는 극세사 대비 먼지 날림과 털빠짐이 적어 알레르기가 있는 가정에도 부담이 없습니다. 여름엔 보송하고 겨울엔 포근한 중간 두께로 사계절 내내 깔아둘 수 있습니다.",
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
      id: "notice",
      label: "주의사항",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-notice-01.webp`, alt: "주의사항 안내" },
      ],
    },
  ];
}
