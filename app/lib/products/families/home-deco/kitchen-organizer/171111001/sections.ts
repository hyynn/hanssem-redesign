import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/kitchen-organizer/171111001";
export const FAMILY_CODE = "171111001";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "밀봉을 개봉해 식품을 담았던 경우 / 오염·훼손된 경우" } },
});

export const notices = createNotices("parcel", "품명: 밀폐용기 / 소재: 스테인리스 스틸(STS304), 실리콘 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "국물 요리까지 안심하고 담는 스텐 밀폐용기",
          body: "냄새와 색이 잘 배지 않는 스테인리스 소재로 만든 S.O.K 밀폐용기입니다. 국물 반찬부터 볶음 요리까지 재가열해도 변형 없이 오래 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "S.O.K 스텐 밀폐용기 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "분리 및 세척이 간편한 구조",
          body: "국내산 에코젠 소재로 만든 뚜껑은 실리콘 분리형 구조로 깨끗하게 세척 및 사용이 가능합니다.(비스페놀 A 무검출).",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "S.O.K 스텐 밀폐용기 분리 기능" },
        {
          type: "text",
          title: "뛰어난 밀폐력",
          body: "4면 클립형으로 내구성이 뛰어나고 흔들려도 내용물이 새지 않아 안심하고 사용할 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-02.webp`, alt: "S.O.K 스텐 밀폐용기 밀폐 기능" },
        {
          type: "text",
          title: "포개어 정리 가능한 구조",
          body: "보관 및 정리시에 사이즈별로 쌓을수도 있고 용기끼리 포개어지는 구조로 되어 있어 효율적으로 보관이 가능합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-03.webp`, alt: "S.O.K 스텐 밀폐용기 적층 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "냄새·색 배임 없는 스테인리스 스틸",
          body: "식품 접촉면 전체를 스테인리스 스틸(STS304)로 제작해 김치, 카레처럼 색과 냄새가 강한 음식을 담아도 자국이 남지 않습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "S.O.K 스텐 밀폐용기 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        {
          type: "text",
          title: "600ml / 1080ml / 1500ml 용량 선택",
          body: "밑반찬 보관에는 600ml, 국·찌개류 소분에는 1080ml, 넉넉한 메인 요리 보관에는 1500ml를 추천합니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "S.O.K 스텐 밀폐용기 사이즈 안내" },
      ],
    },
  ];
}
