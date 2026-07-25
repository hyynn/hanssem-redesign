import type { ProductDetailSection } from "@/app/lib/types";
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices, WARRANTY_VIDEO_SRC } from "@/app/lib/products/detail-presets";

export const FAMILY_PATH = "dining/kitchen-storage/121210001";
export const FAMILY_CODE = "121210001";

export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 60~90분", "주의사항": "좌형·우형은 여닫이문이 열리는 방향을 의미하니 설치 공간의 동선을 먼저 확인해 주세요." } },
});

export const notices = createNotices("install", "품명: 주방수납장 / 소재: LPM(E0 등급 친환경 보드) / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)");

export function createSections(): ProductDetailSection[] {
  return [
    {
      id: "basic",
      label: "기본정보",
      blocks: [
        {
          type: "text",
          title: "자투리 공간을 채우는 60cm 팬트리장",
          body: "모디 주방수납 팬트리장은 냉장고 옆이나 주방 모서리 틈새를 알뜰하게 채우는 60cm 폭 수납장입니다. 좁은 자리에도 부담 없이 들어가면서 수납량은 넉넉하게 확보했습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-01.webp`, alt: "모디 주방수납 팬트리장 60cm 기본정보" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-basic-02.webp`, alt: "모디 주방수납 팬트리장 60cm 기본정보" },
      ],
    },
    {
      id: "function",
      label: "기능",
      blocks: [
        {
          type: "text",
          title: "동선에 맞춰 고르는 여닫이 방향",
          body: "고급형은 좌형·우형 중 주방 동선에 맞는 방향을 선택할 수 있습니다. 내부는 조절 선반으로 구성되어 있어 보관할 물건 크기에 맞춰 칸을 자유롭게 나눌 수 있습니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-function-01.webp`, alt: "모디 주방수납 팬트리장 60cm 내부 구성" },
      ],
    },
    {
      id: "material",
      label: "소재",
      blocks: [
        {
          type: "text",
          title: "친환경 등급의 LPM 마감",
          body: "E0 등급 친환경 보드에 LPM 필름을 마감해 유해물질 걱정 없이 사용할 수 있습니다. 화이트·메이플 두 가지 컬러 모두 주방 어디에나 무난하게 어울립니다.",
        },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-01.webp`, alt: "모디 주방수납 팬트리장 60cm 소재" },
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-material-02.webp`, alt: "모디 주방수납 팬트리장 60cm 상세 소재" },
      ],
    },
    {
      id: "size",
      label: "사이즈",
      blocks: [
        { type: "image", src: `/images/products/${FAMILY_PATH}/${FAMILY_CODE}-size-01.webp`, alt: "모디 주방수납 팬트리장 60cm 사이즈 안내" },
      ],
    },
    {
      id: "warranty",
      label: "품질보증",
      blocks: [
        { type: "video", src: WARRANTY_VIDEO_SRC, alt: "품질보증 비디오" },
        {
          type: "text",
          title: "한샘 품질보증",
          body: "KC 안전기준을 통과한 소재와 설치 품질 검사를 거친 제품입니다. 수령 후 도어 뒤틀림 등 제품 하자 확인 시 무상으로 교환해 드립니다.",
        },
      ],
    },
  ];
}
