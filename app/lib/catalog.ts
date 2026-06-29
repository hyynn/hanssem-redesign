import { ProductSummary } from "./types";
import { summaries as monoBedSummaries } from "./products/families/bedroom/bed/101012001";
import { summaries as lunesoftBedSummaries } from "./products/families/bedroom/bed/101012002";
import { summaries as steadyCompySummaries } from "./products/families/bedroom/bed/101014001";
import { summaries as balanceSEurotopSummaries } from "./products/families/bedroom/mattress/101111001";
import { summaries as stayTopperSummaries } from "./products/families/bedroom/mattress/101112001";
import { summaries as comfortBaseSummaries } from "./products/families/bedroom/mattress/101112002";
import { summaries as foseasonBaseSummaries } from "./products/families/bedroom/mattress/101112003";
import { summaries as monoDresserSummaries } from "./products/families/bedroom/dresser/101210001";
import { summaries as monoChestSummaries } from "./products/families/bedroom/dresser/101210002";
import { summaries as euroNightstandSummaries } from "./products/families/bedroom/dresser/101212001";
import { summaries as moaSofaSummaries } from "./products/families/livingroom/sofa/111012001";
import { summaries as ridoSofaSummaries } from "./products/families/livingroom/sofa/111010001";
import { summaries as mvmeReclineSummaries } from "./products/families/livingroom/sofa/111011001";
import { summaries as hyuModeSummaries } from "./products/families/livingroom/sofa/111013001";
import { summaries as hyuLoungeSummaries } from "./products/families/livingroom/sofa/111013002";
import { summaries as lagoneSummaries } from "./products/families/livingroom/table/111111001";
import { summaries as pringleSummaries } from "./products/families/livingroom/table/111111002";
import { summaries as clintLiftupSummaries } from "./products/families/livingroom/table/111111003";
import { summaries as jackRoundSummaries } from "./products/families/livingroom/table/111112001";
import { summaries as clintHeightSummaries } from "./products/families/livingroom/table/111112002";
import { summaries as clintUrbanCabSummaries } from "./products/families/livingroom/cabinet/111110001";
import { summaries as clintModernCabSummaries } from "./products/families/livingroom/cabinet/111110002";
import { summaries as pleatsCabSummaries } from "./products/families/livingroom/cabinet/111110003";
import { summaries as milanAvCabSummaries } from "./products/families/livingroom/cabinet/111110004";

export const catalog: ProductSummary[] = [
  // ─── 패밀리 상품 (각 패밀리 파일이 summaries 관리) ───────────────────────
  ...monoBedSummaries,
  ...lunesoftBedSummaries,
  ...steadyCompySummaries,
  ...balanceSEurotopSummaries,
  ...stayTopperSummaries,
  ...comfortBaseSummaries,
  ...foseasonBaseSummaries,
  ...monoDresserSummaries,
  ...monoChestSummaries,
  ...euroNightstandSummaries,
  ...moaSofaSummaries,
  ...ridoSofaSummaries,
  ...mvmeReclineSummaries,
  ...hyuModeSummaries,
  ...hyuLoungeSummaries,
  ...lagoneSummaries,
  ...pringleSummaries,
  ...clintLiftupSummaries,
  ...jackRoundSummaries,
  ...clintHeightSummaries,
  ...clintUrbanCabSummaries,
  ...clintModernCabSummaries,
  ...pleatsCabSummaries,
  ...milanAvCabSummaries,
];

// 특정 familyId에 속하는 모든 상품 (sibling picker용)
export function getSiblings(familyId: string): ProductSummary[] {
  return catalog.filter((p) => p.familyId === familyId);
}

// 카테고리 필터 (categoryTags도 포함해 검색)
export function getByCategory(cat: string, limit?: number): ProductSummary[] {
  const result = catalog.filter(
    (p) => p.category.includes(cat) || p.categoryTags?.includes(cat)
  );
  return limit ? result.slice(0, limit) : result;
}

// ID로 단건 조회
export function getProductById(id: string): ProductSummary {
  const p = catalog.find((p) => p.id === id);
  if (!p) throw new Error(`Product not found: ${id}`);
  return p;
}

// 베스트셀러 (reviewCount 내림차순)
export function getBestSellers(limit = 8): ProductSummary[] {
  return [...catalog]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}
