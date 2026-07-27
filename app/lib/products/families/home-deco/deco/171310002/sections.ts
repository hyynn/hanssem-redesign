import type { ProductDetailSection } from "@/app/lib/types";
import { PARCEL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "home-deco/deco/171310002";
export const FAMILY_CODE = "171310002";

export const deliveryGuides = withDeliveryOverrides(PARCEL_DELIVERY, {
  "반품 / 교환 안내": { rows: { "반품 불가 조건": "설치·사용 흔적이 있는 경우 / 오염·훼손된 경우", "A/S": "한샘 고객센터 1688-4945 / 전기 부품 하자 발생 시 1년 내 무상 A/S" } },
});

export const notices = createNotices("parcel", "품명: 조명(테이블·플로어 램프 세트) / 소재: 스틸, 유리 셰이드 / 정격전압: 220V / 제조국: 중국 / KC 전기용품 안전인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "부드러운 곡선의 올리비아 램프 세트",
          body: "유리 셰이드의 완만한 곡선이 편안한 인상을 주는 테이블·플로어 램프 세트입니다. 어떤 인테리어에도 스며드는 미니멀한 실루엣으로 침실과 거실 어디에나 잘 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "올리비아 램프 세트 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "눈이 편안한 간접 확산광",
          body: "유리 셰이드가 전구 빛을 한 번 걸러 부드럽게 퍼뜨립니다. 직접광의 눈부심 없이 공간 전체가 은은하게 밝아져 취침 전 독서나 휴식 조명으로 알맞습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.gif`, alt: "올리비아 램프 세트 확산광 기능" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "올리비아 램프 세트 소재" },
        {
          type: "text",
          title: "유리 셰이드와 무광 스틸 바디",
          body: "결이 살아 있는 유리가 빛을 따뜻하게 데워주고, 무광 스틸 바디가 단정하게 중심을 잡습니다. 셰이드는 분리해 먼지를 털어낼 수 있어 관리가 쉽습니다.",
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
  ];
}
