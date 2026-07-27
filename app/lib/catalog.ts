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
import { summaries as donoEdgeSummaries } from "./products/families/dining/table/121013001";
import { summaries as foreComfortSummaries } from "./products/families/dining/table/121012001";
import { summaries as minaNaturalOvalTableSummaries } from "./products/families/dining/table/121014001";
import { summaries as minaSteelSquareTableSummaries } from "./products/families/dining/table/121010001";
import { summaries as donoSlimDiningChairSummaries } from "./products/families/dining/chair/121110001";
import { summaries as minaRoundDiningChairSummaries } from "./products/families/dining/chair/121110002";
import { summaries as widRoundDiningChairSummaries } from "./products/families/dining/chair/121110003";
import { summaries as heardLeatherBarChairSummaries } from "./products/families/dining/chair/121111001";
import { summaries as euro501FlatBarChairSummaries } from "./products/families/dining/chair/121111002";
import { summaries as libupBenchSummaries } from "./products/families/dining/chair/121112001";
import { summaries as blancChairStoolSummaries } from "./products/families/dining/chair/121112002";
import { summaries as modiPantryCabinetSummaries } from "./products/families/dining/kitchen-storage/121210001";
import { summaries as modiCafeCabinetSeriesSummaries } from "./products/families/dining/kitchen-storage/121210002";
import { summaries as modiRangeStandSeriesSummaries } from "./products/families/dining/kitchen-storage/121210003";
import { summaries as softCoolingSetSummaries } from "./products/families/home-deco/bedding/171012001";
import { summaries as modalAllergySetSummaries } from "./products/families/home-deco/bedding/171012002";
import { summaries as foseasonTencelSetSummaries } from "./products/families/home-deco/bedding/171012003";
import { summaries as polandGooseSummaries } from "./products/families/home-deco/bedding/171010001";
import { summaries as balanceGoosePillowSummaries } from "./products/families/home-deco/bedding/171011001";
import { summaries as sleepdiverPillowSummaries } from "./products/families/home-deco/bedding/171011002";
import { summaries as sokSlidingBoxSummaries } from "./products/families/home-deco/kitchen-organizer/171110001";
import { summaries as allstenDishRackSummaries } from "./products/families/home-deco/kitchen-organizer/171112001";
import { summaries as primeKnifeRackSummaries } from "./products/families/home-deco/kitchen-organizer/171112002";
import { summaries as windowPackageSummaries } from "./products/families/home-deco/curtain-blind/171210001";
import { summaries as cozyCurtainSummaries } from "./products/families/home-deco/curtain-blind/171210002";
import { summaries as relaxBlackoutSummaries } from "./products/families/home-deco/curtain-blind/171210003";
import { summaries as shinyLunaBlindSummaries } from "./products/families/home-deco/curtain-blind/171211001";
import { summaries as doubleRollscreenSummaries } from "./products/families/home-deco/curtain-blind/171211002";
import { summaries as newKlimtLampSummaries } from "./products/families/home-deco/deco/171310001";
import { summaries as oliviaLampSummaries } from "./products/families/home-deco/deco/171310002";
import { summaries as joyFloorLampSummaries } from "./products/families/home-deco/deco/171310003";
import { summaries as emmaSlubRugSummaries } from "./products/families/home-deco/deco/171311001";
import { summaries as samkidsRoundRugSummaries } from "./products/families/home-deco/deco/171311002";
import { summaries as primeTuftingRugSummaries } from "./products/families/home-deco/deco/171311003";
import { summaries as sokSteelContainerSummaries } from "./products/families/home-deco/kitchen-organizer/171111001";
import { summaries as clearFoodContainerSummaries } from "./products/families/home-deco/kitchen-organizer/171111002";
import { summaries as clearGlassRiceContainerSummaries } from "./products/families/home-deco/kitchen-organizer/171111003";
import { summaries as moonJarDiffuserSummaries } from "./products/families/home-deco/deco/171312001";
import { summaries as foseasonDiffuserSummaries } from "./products/families/home-deco/deco/171312002";
import { summaries as leatherTissueCoverSummaries } from "./products/families/home-deco/deco/171312003";
import { summaries as feltTissueCaseSummaries } from "./products/families/home-deco/deco/171312004";
import { summaries as tarpaulinShoppingBagSummaries } from "./products/families/home-deco/deco/171312005";

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
  ...donoEdgeSummaries,
  ...foreComfortSummaries,
  ...minaNaturalOvalTableSummaries,
  ...minaSteelSquareTableSummaries,
  ...donoSlimDiningChairSummaries,
  ...minaRoundDiningChairSummaries,
  ...widRoundDiningChairSummaries,
  ...heardLeatherBarChairSummaries,
  ...euro501FlatBarChairSummaries,
  ...libupBenchSummaries,
  ...blancChairStoolSummaries,
  ...modiPantryCabinetSummaries,
  ...modiCafeCabinetSeriesSummaries,
  ...modiRangeStandSeriesSummaries,
  ...softCoolingSetSummaries,
  ...modalAllergySetSummaries,
  ...foseasonTencelSetSummaries,
  ...polandGooseSummaries,
  ...balanceGoosePillowSummaries,
  ...sleepdiverPillowSummaries,
  ...sokSlidingBoxSummaries,
  ...allstenDishRackSummaries,
  ...primeKnifeRackSummaries,
  ...windowPackageSummaries,
  ...cozyCurtainSummaries,
  ...relaxBlackoutSummaries,
  ...shinyLunaBlindSummaries,
  ...doubleRollscreenSummaries,
  ...newKlimtLampSummaries,
  ...oliviaLampSummaries,
  ...joyFloorLampSummaries,
  ...emmaSlubRugSummaries,
  ...samkidsRoundRugSummaries,
  ...primeTuftingRugSummaries,
  ...sokSteelContainerSummaries,
  ...clearFoodContainerSummaries,
  ...clearGlassRiceContainerSummaries,
  ...moonJarDiffuserSummaries,
  ...foseasonDiffuserSummaries,
  ...leatherTissueCoverSummaries,
  ...feltTissueCaseSummaries,
  ...tarpaulinShoppingBagSummaries,
];

// 특정 familyId에 속하는 모든 상품 (sibling picker용)
export function getSiblings(familyId: string): ProductSummary[] {
  return catalog.filter((p) => p.familyId === familyId);
}

// 카테고리 필터 (categoryTags도 포함해 검색), salesCount 내림차순 정렬
export function getByCategory(cat: string, limit?: number): ProductSummary[] {
  const result = catalog
    .filter((p) => p.category.includes(cat) || p.categoryTags?.includes(cat))
    .sort((a, b) => b.salesCount - a.salesCount);
  return limit ? result.slice(0, limit) : result;
}

// ID로 단건 조회
export function getProductById(id: string): ProductSummary {
  const p = catalog.find((p) => p.id === id);
  if (!p) throw new Error(`Product not found: ${id}`);
  return p;
}

// 베스트셀러 (salesCount 내림차순 — 이달의 베스트셀러)
export function getBestSellers(limit = 8): ProductSummary[] {
  return [...catalog]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, limit);
}
