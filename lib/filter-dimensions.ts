// filter-dimensions.ts
// 필터 축(dimension) 정의.
//
// 설계 원칙:
// - "스타일" 축(예: 호텔침대, 저상형침대)은 이미 상품코드의 소분류 슬롯에
//   인코딩되어 있으므로 별도로 저장하지 않고, CATEGORY_TREE에서 형제
//   소분류 목록을 동적으로 가져와 "다른 스타일로 이동" 링크용으로만 사용한다.
//   → 상품 데이터(ProductDetail)에는 style을 저장하지 않는다.
// - 코드에 담을 수 없는 나머지 축(사이즈/구성/기능)만 ProductDetail.filterAttributes에
//   저장하고, 이 파일에서는 "어느 카테고리 페이지에서 어떤 축을 필터 칩으로
//   노출할지"와 "그 축에 어떤 옵션이 있는지"만 정의한다.
// - 한 카테고리에 필요한 축만 채우고, 아직 안 쓰는 카테고리는 비워둔 채로 둔다
//   (사용하지 않는 카테고리에 추측성 옵션을 미리 채워넣지 않는다).

import { CATEGORY_TREE } from "./category-codes";

export type FilterDimensionKey = "size" | "config" | "feature";

export interface FilterDimensionDef {
  key: FilterDimensionKey;
  label: string; // 필터 UI에 노출될 한글 라벨
  options: string[]; // 이 카테고리에서 노출할 선택지 (실제 데이터에 존재하는 값만)
}

/**
 * 소분류 코드(6자리, 대분류+중분류+소분류) → 그 카테고리 페이지에서
 * 필터 칩으로 노출할 축 목록.
 *
 * 키는 category-codes.ts의 buildCategoryCode(major, mid, leaf) 결과와
 * 동일한 6자리 문자열이어야 한다.
 */
export const FILTER_DIMENSIONS_BY_CATEGORY: Record<string, FilterDimensionDef[]> = {
  // 침실(10) > 침대(10) > 호텔침대(12)
  "101012": [
    { key: "size", label: "사이즈", options: ["SS", "Q/K", "KK"] },
    { key: "config", label: "구성", options: ["침대", "침대+매트"] },
    { key: "feature", label: "기능", options: ["조명리모컨형"] },
  ],
};

/**
 * 스타일 축 옵션(형제 소분류 이름 목록)을 카테고리 코드로부터 동적으로 가져온다.
 * 상품 데이터에 저장하지 않고, 매번 CATEGORY_TREE에서 계산한다.
 *
 * 예: getStyleFilterOptions("101012")
 *     → 침실>침대의 형제 소분류 전체: ["슈퍼·싱글침대", "퀸·킹침대", "호텔침대", "수납침대", "저상형·패밀리침대"]
 */
export function getStyleFilterOptions(categoryCode: string): string[] {
  const major = categoryCode.slice(0, 2);
  const mid = categoryCode.slice(2, 4);
  const tree = CATEGORY_TREE as any;
  const midNode = tree[major]?.sub?.[mid];
  if (!midNode) return [];
  return Object.values(midNode.sub) as string[];
}

/**
 * 특정 카테고리 페이지에서 노출할 전체 필터 축(사이즈/구성/기능 + 스타일)을
 * 합쳐서 반환하는 헬퍼. 실제 필터 UI 컴포넌트가 이 함수 하나만 호출하면 됨.
 */
export function getFilterDimensions(categoryCode: string): {
  style: string[];
  dimensions: FilterDimensionDef[];
} {
  return {
    style: getStyleFilterOptions(categoryCode),
    dimensions: FILTER_DIMENSIONS_BY_CATEGORY[categoryCode] ?? [],
  };
}
