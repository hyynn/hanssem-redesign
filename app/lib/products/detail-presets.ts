import type { DeliveryGuideGroup, DeliveryGuideRow, NoticeItem } from "@/app/lib/types";

// 배송·고지 프리셋 — 상품의 배송 유형(택배/직배송 설치/직배송/맞춤 시공)이 안내 문구의
// 기본 골격을 결정하므로, 패밀리별 sections.ts는 유형 프리셋을 고르고 상품 고유 사정
// (사전판매, 설치 소요시간, 전기 부품 A/S 등)만 withDeliveryOverrides로 덮어쓴다.

// ─── 배송 안내 프리셋 4종 ─────────────────────────────────────────────────────

/** 택배 소품 (침구·러그·조명·주방용품 등) */
export const PARCEL_DELIVERY: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "택배배송 (CJ대한통운)" },
      { label: "배송기간", value: "주문 후 2~3일 내 출고 (주말·공휴일 제외)" },
      { label: "배송비", value: "구매금액 50,000원 이상 무료 / 미만 시 3,000원" },
      { label: "배송지역", value: "전국 배송 (제주도 및 도서산간 지역 추가 배송비 발생)" },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "포장 개봉 후 사용·세탁한 경우 / 오염·훼손된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 교환 처리" },
    ],
  },
];

/** 직배송 + 전문팀 설치 가구 (침대·소파·거실장·식탁 등) */
export const INSTALL_DELIVERY: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀 설치 포함)" },
      { label: "배송기간", value: "결제 후 5~7일 이내 순차 배송" },
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

/** 직배송 매트리스류 (설치 대신 안착 서비스, 비닐 개봉 후 반품 불가) */
export const DIRECT_DELIVERY: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 배송팀)" },
      { label: "배송기간", value: "주문 후 2~3주 내 순차 배송" },
      { label: "배송비", value: "구매금액 50,000원 이상 무료 / 미만 시 3,000원" },
      { label: "배송지역", value: "전국 배송 (단, 제주도 및 도서산간 지역 배송 불가)" },
      { label: "배송 안내", value: "배송 3~5일 전 배송팀에서 사전 연락 후 방문합니다." },
    ],
  },
  {
    title: "설치 서비스 안내",
    rows: [
      { label: "설치 서비스", value: "포함 (침대 프레임 위 안착 서비스)" },
      { label: "주의사항", value: "설치 장소까지 운반 경로(계단·복도·문틈) 확인이 필요합니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "상품 수령 후 7일 이내" },
      { label: "반품·교환 비용", value: "단순 변심 반품 시 왕복 배송비 고객 부담 / 제품 하자 시 무료 처리" },
      { label: "반품 불가 조건", value: "비닐 포장 개봉 후 / 사용·오염·훼손된 경우" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 제품 하자 발생 시 1년 내 무상 A/S" },
    ],
  },
];

/** 실측 후 맞춤 제작·시공 (커튼·블라인드 시공 상품) */
export const CUSTOM_INSTALL_DELIVERY: DeliveryGuideGroup[] = [
  {
    title: "배송 안내",
    rows: [
      { label: "배송방법", value: "직배송 (한샘 전문 시공팀)" },
      { label: "배송기간", value: "실측 후 제작 2~3주 내 시공 방문" },
      { label: "배송비", value: "무료 (시공비 포함)" },
      { label: "배송지역", value: "전국 (제주도 및 도서산간 지역 시공 불가)" },
      { label: "시공 안내", value: "주문 후 전문 실측 기사가 방문 일정을 조율합니다." },
    ],
  },
  {
    title: "반품 / 교환 안내",
    rows: [
      { label: "반품·교환 기간", value: "시공 완료 후 7일 이내 (제품 하자에 한함)" },
      { label: "반품·교환 비용", value: "맞춤 시공 상품 특성상 단순 변심 반품 불가 / 제품 하자 시 무료 처리" },
      { label: "취소 가능 기간", value: "실측 방문 전까지 무료 취소 가능" },
      { label: "A/S", value: "한샘 고객센터 1688-4945 / 시공 하자 발생 시 1년 내 무상 A/S" },
    ],
  },
];

// ─── 프리셋 override 헬퍼 ─────────────────────────────────────────────────────

type GroupOverride =
  | { rows: Record<string, string | null> } // label별 값 교체 (null이면 행 제거, 새 label은 뒤에 추가)
  | { replaceRows: DeliveryGuideRow[] }     // 행 구성 자체가 다르면 통째로 교체
  | null;                                    // 그룹 제거

export function withDeliveryOverrides(
  preset: DeliveryGuideGroup[],
  overrides: Record<string, GroupOverride>
): DeliveryGuideGroup[] {
  return preset
    .filter((group) => overrides[group.title] !== null)
    .map((group) => {
      const override = overrides[group.title];
      if (!override) return group;
      if ("replaceRows" in override) return { ...group, rows: override.replaceRows };

      const merged = group.rows
        .filter((row) => override.rows[row.label] !== null)
        .map((row) =>
          override.rows[row.label] !== undefined
            ? { ...row, value: override.rows[row.label] as string }
            : row
        );
      const known = new Set(group.rows.map((row) => row.label));
      for (const [label, value] of Object.entries(override.rows)) {
        if (!known.has(label) && value !== null) merged.push({ label, value });
      }
      return { ...group, rows: merged };
    });
}

// ─── 구매전 필수 확인사항 / 상품 고시정보 / 교환·반품 ─────────────────────────

export type DeliveryType = "parcel" | "install" | "direct" | "customInstall";

const PRE_CHECK_BY_TYPE: Record<DeliveryType, string> = {
  parcel:
    "택배로 배송되는 상품으로, 모니터 환경에 따라 실제 색상과 다소 차이가 있을 수 있습니다. 수령 후 사용 전 구성품과 상태를 먼저 확인해 주세요.",
  install:
    "전문 배송팀이 방문 설치하는 상품으로, 주문 전 설치 공간과 운반 경로(엘리베이터·계단·문 폭) 확인이 필요합니다. 배송 일정은 배송팀에서 사전 연락 후 조율됩니다.",
  direct:
    "전문 배송팀이 직접 배송하는 상품으로, 배송 3~5일 전 사전 연락 후 방문합니다. 설치 장소까지의 운반 경로(계단·복도·문틈)를 미리 확인해 주세요.",
  customInstall:
    "실측 후 맞춤 제작되는 시공 상품입니다. 주문 후 전문 실측 기사가 방문 일정을 조율하며, 실측 결과에 따라 최종 결제 금액이 변동될 수 있습니다.",
};

const RETURNS_BY_TYPE: Record<DeliveryType, string> = {
  parcel:
    "단순 변심 교환/반품은 상품 수령 후 7일 이내 가능하며, 왕복 배송비는 고객 부담입니다. 포장 개봉 후 사용·세탁한 상품은 교환/반품이 어렵습니다.",
  install:
    "단순 변심 교환/반품은 상품 수령 후 7일 이내 가능하며, 왕복 배송비는 고객 부담입니다. 설치 완료 후에는 단순 변심 교환/반품이 불가하며, 제품 하자의 경우 무료 처리됩니다.",
  direct:
    "단순 변심 교환/반품은 상품 수령 후 7일 이내 가능하며, 왕복 배송비는 고객 부담입니다. 위생상 비닐 포장 개봉 후에는 단순 변심 교환/반품이 불가합니다.",
  customInstall:
    "맞춤 제작 상품 특성상 단순 변심 교환/반품이 불가합니다. 실측 방문 전까지는 무료 취소 가능하며, 제품·시공 하자의 경우 무상 처리됩니다.",
};

export function createNotices(
  type: DeliveryType,
  gosi: string,
  overrides?: Partial<Record<"preCheck" | "returns", string>>
): NoticeItem[] {
  return [
    { title: "구매전 필수 확인사항", content: overrides?.preCheck ?? PRE_CHECK_BY_TYPE[type] },
    { title: "상품 고시정보", content: gosi },
    { title: "교환 / 반품", content: overrides?.returns ?? RETURNS_BY_TYPE[type] },
  ];
}
