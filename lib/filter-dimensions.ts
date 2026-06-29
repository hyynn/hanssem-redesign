import type { ProductSummary } from "@/app/lib/types";
import { CATEGORY_TREE } from "./category-codes";

export type FilterDimensionKey = "size" | "config" | "feature" | "color";

/** 축 정의 — options는 런타임에 products에서 계산 */
export interface FilterAxisDef {
  key: FilterDimensionKey;
  label: string;
}

/** 컴포넌트에 전달되는 완성된 dimension (options 포함) */
export interface FilterDimensionDef extends FilterAxisDef {
  options: string[];
}

/** 한글 색상명 → hex (상품 카드·상세 페이지 컬러 칩 렌더링용) */
export const COLOR_HEX: Record<string, string> = {
  "차콜": "#3d3d3d",
  "화이트": "#f5f5f5",
  "크림화이트": "#f8f5ef",
  "페더화이트": "#f0ede8",
  "미드그레이": "#888888",
  "모카": "#8a7c6a",
  "베이지": "#e8dcc8",
  "네이비": "#1a2a3a",
  "포레스트": "#2e4d3a",
  "브라운": "#4a3728",
  "아이보리": "#f5ede0",
  "화이트마블": "#f0eee9",
  "머드베이지": "#c5bcad",
  "블랙": "#1a1a1a",
  "그레이": "#9a9a9a",
  "뉴메이플": "#e8d4b8",
  "그린": "#73a66b",
  "오트밀": "#e0d9c8",
};

/**
 * 개별 색상명 → 계열명.
 * 필터는 계열 단위로 노출하되, 상품 데이터(colors[])는 개별 색상명 그대로 유지.
 */
export const COLOR_GROUPS: Record<string, string> = {
  "화이트": "화이트계열",
  "화이트마블": "화이트계열",
  "아이보리": "아이보리계열",
  "베이지": "베이지계열",
  "머드베이지": "베이지계열",
  "내추럴": "내추럴계열",
  "그레이": "그레이계열",
  "차콜": "그레이계열",
  "크림화이트": "화이트계열",
  "페더화이트": "화이트계열",
  "미드그레이": "그레이계열",
  "블랙": "블랙계열",
  "브라운": "브라운계열",
  "모카": "브라운계열",
  "뉴메이플": "메이플계열",
  "네이비": "네이비계열",
  "포레스트": "초록계열",
  "그린": "초록계열",
  "오트밀": "아이보리계열",
};

/** 계열명 → 대표 hex (필터 스와치 렌더링용) */
export const COLOR_GROUP_HEX: Record<string, string> = {
  "화이트계열": "#ffffff",
  "아이보리계열": "#faf6f0",
  "베이지계열": "#f0e3d1",
  "내추럴계열": "#d4b888",
  "그레이계열": "#818181",
  "블랙계열": "#1a1a1a",
  "브라운계열": "#8c552e",
  "오크계열": "#b38a54",
  "메이플계열": "#caa57d",
  "월넛계열": "#49352e",
  "네이비계열": "#002a69",
  "파랑계열": "#3186e8",
  "초록계열": "#73a66b",
  "빨강계열": "#ff4040",
  "핑크계열": "#ffade2",
  "노랑계열": "#fccc4e",
};

/**
 * 기본 필터 축 — 모든 카테고리에 공통 적용.
 * buildDimensions()가 products를 스캔해 실제 옵션이 없는 축은 자동 제외하므로,
 * 카테고리별 수동 등록 없이도 존재하는 옵션만 필터로 노출된다.
 */
export const ALL_FILTER_AXES: FilterAxisDef[] = [
  { key: "size",    label: "사이즈" },
  { key: "config",  label: "구성" },
  { key: "feature", label: "기능" },
  { key: "color",   label: "색상" },
];

/**
 * 소분류 코드(6자리) → 필터 축 순서·구성 override.
 * 기본값(ALL_FILTER_AXES)과 다르게 제어해야 할 카테고리만 등록.
 */
export const FILTER_AXES_BY_CATEGORY: Record<string, FilterAxisDef[]> = {};

/**
 * 현재 카테고리 products를 스캔해 각 축의 실제 옵션을 집계.
 * 옵션이 하나도 없는 축은 결과에서 자동 제외.
 */
export function buildDimensions(
  axes: FilterAxisDef[],
  products: ProductSummary[]
): FilterDimensionDef[] {
  return axes
    .map((axis) => {
      let options: string[];
      if (axis.key === "color") {
        options = [...new Set(
          products.flatMap((p) =>
            (p.colors ?? []).map((c) => COLOR_GROUPS[c]).filter((g): g is string => !!g)
          )
        )];
      } else {
        const key = axis.key; // narrowed: "size" | "config" | "feature"
        options = [...new Set(products.flatMap((p) => p.filterAttributes?.[key] ?? []))];
      }
      return { ...axis, options };
    })
    .filter((d) => d.options.length > 0);
}

/**
 * 스타일 축 옵션(형제 소분류 이름 목록)을 카테고리 코드로부터 동적으로 가져온다.
 */
export function getStyleFilterOptions(categoryCode: string): string[] {
  const major = categoryCode.slice(0, 2);
  const mid = categoryCode.slice(2, 4);
  const tree = CATEGORY_TREE as any;
  const midNode = tree[major]?.sub?.[mid];
  if (!midNode) return [];
  return Object.values(midNode.sub) as string[];
}
