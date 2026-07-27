import type { ProductDetail } from "../types";
import { summaries as monoBedSummaries, getDetail as getMonoBedDetail } from "./families/bedroom/bed/101012001";
import { summaries as lunesoftBedSummaries, getDetail as getLunesoftBedDetail } from "./families/bedroom/bed/101012002";
import { summaries as steadyCompySummaries, getDetail as getSteadyCompyDetail } from "./families/bedroom/bed/101014001";
import { summaries as balanceSEurotopSummaries, getDetail as getBalanceSEurotopDetail } from "./families/bedroom/mattress/101111001";
import { summaries as stayTopperSummaries, getDetail as getStayTopperDetail } from "./families/bedroom/mattress/101112001";
import { summaries as comfortBaseSummaries, getDetail as getComfortBaseDetail } from "./families/bedroom/mattress/101112002";
import { summaries as foseasonBaseSummaries, getDetail as getFoseasonBaseDetail } from "./families/bedroom/mattress/101112003";
import { summaries as monoDresserSummaries, getDetail as getMonoDresserDetail } from "./families/bedroom/dresser/101210001";
import { summaries as monoChestSummaries, getDetail as getMonoChestDetail } from "./families/bedroom/dresser/101210002";
import { summaries as euroNightstandSummaries, getDetail as getEuroNightstandDetail } from "./families/bedroom/dresser/101212001";
import { summaries as moaSofaSummaries, getDetail as getMoaSofaDetail } from "./families/livingroom/sofa/111012001";
import { summaries as ridoSofaSummaries, getDetail as getRidoSofaDetail } from "./families/livingroom/sofa/111010001";
import { summaries as mvmeReclineSummaries, getDetail as getMvmeReclineDetail } from "./families/livingroom/sofa/111011001";
import { summaries as hyuModeSummaries, getDetail as getHyuModeDetail } from "./families/livingroom/sofa/111013001";
import { summaries as hyuLoungeSummaries, getDetail as getHyuLoungeDetail } from "./families/livingroom/sofa/111013002";
import { summaries as lagoneSummaries, getDetail as getLagoneDetail } from "./families/livingroom/table/111111001";
import { summaries as pringleSummaries, getDetail as getPringleDetail } from "./families/livingroom/table/111111002";
import { summaries as clintLiftupSummaries, getDetail as getClintLiftupDetail } from "./families/livingroom/table/111111003";
import { summaries as jackRoundSummaries, getDetail as getJackRoundDetail } from "./families/livingroom/table/111112001";
import { summaries as clintHeightSummaries, getDetail as getClintHeightDetail } from "./families/livingroom/table/111112002";
import { summaries as clintUrbanCabSummaries, getDetail as getClintUrbanCabDetail } from "./families/livingroom/cabinet/111110001";
import { summaries as clintModernCabSummaries, getDetail as getClintModernCabDetail } from "./families/livingroom/cabinet/111110002";
import { summaries as pleatsCabSummaries, getDetail as getPleatsCabDetail } from "./families/livingroom/cabinet/111110003";
import { summaries as milanAvCabSummaries, getDetail as getMilanAvCabDetail } from "./families/livingroom/cabinet/111110004";
import { summaries as donoEdgeSummaries, getDetail as getDonoEdgeDetail } from "./families/dining/table/121013001";
import { summaries as foreComfortSummaries, getDetail as getForeComfortDetail } from "./families/dining/table/121012001";
import { summaries as minaNaturalOvalTableSummaries, getDetail as getMinaNaturalOvalTableDetail } from "./families/dining/table/121014001";
import { summaries as minaSteelSquareTableSummaries, getDetail as getMinaSteelSquareTableDetail } from "./families/dining/table/121010001";
import { summaries as donoSlimDiningChairSummaries, getDetail as getDonoSlimDiningChairDetail } from "./families/dining/chair/121110001";
import { summaries as minaRoundDiningChairSummaries, getDetail as getMinaRoundDiningChairDetail } from "./families/dining/chair/121110002";
import { summaries as widRoundDiningChairSummaries, getDetail as getWidRoundDiningChairDetail } from "./families/dining/chair/121110003";
import { summaries as heardLeatherBarChairSummaries, getDetail as getHeardLeatherBarChairDetail } from "./families/dining/chair/121111001";
import { summaries as euro501FlatBarChairSummaries, getDetail as getEuro501FlatBarChairDetail } from "./families/dining/chair/121111002";
import { summaries as libupBenchSummaries, getDetail as getLibupBenchDetail } from "./families/dining/chair/121112001";
import { summaries as blancChairStoolSummaries, getDetail as getBlancChairStoolDetail } from "./families/dining/chair/121112002";
import { summaries as modiPantryCabinetSummaries, getDetail as getModiPantryCabinetDetail } from "./families/dining/kitchen-storage/121210001";
import { summaries as modiCafeCabinetSeriesSummaries, getDetail as getModiCafeCabinetSeriesDetail } from "./families/dining/kitchen-storage/121210002";
import { summaries as modiRangeStandSeriesSummaries, getDetail as getModiRangeStandSeriesDetail } from "./families/dining/kitchen-storage/121210003";
import { summaries as softCoolingSetSummaries, getDetail as getSoftCoolingSetDetail } from "./families/home-deco/bedding/171012001";
import { summaries as modalAllergySetSummaries, getDetail as getModalAllergySetDetail } from "./families/home-deco/bedding/171012002";
import { summaries as foseasonTencelSetSummaries, getDetail as getFoseasonTencelSetDetail } from "./families/home-deco/bedding/171012003";
import { summaries as polandGooseSummaries, getDetail as getPolandGooseDetail } from "./families/home-deco/bedding/171010001";
import { summaries as balanceGoosePillowSummaries, getDetail as getBalanceGoosePillowDetail } from "./families/home-deco/bedding/171011001";
import { summaries as sleepdiverPillowSummaries, getDetail as getSleepdiverPillowDetail } from "./families/home-deco/bedding/171011002";
import { summaries as sokSlidingBoxSummaries, getDetail as getSokSlidingBoxDetail } from "./families/home-deco/kitchen-organizer/171110001";
import { summaries as allstenDishRackSummaries, getDetail as getAllstenDishRackDetail } from "./families/home-deco/kitchen-organizer/171112001";
import { summaries as primeKnifeRackSummaries, getDetail as getPrimeKnifeRackDetail } from "./families/home-deco/kitchen-organizer/171112002";
import { summaries as windowPackageSummaries, getDetail as getWindowPackageDetail } from "./families/home-deco/curtain-blind/171210001";
import { summaries as cozyCurtainSummaries, getDetail as getCozyCurtainDetail } from "./families/home-deco/curtain-blind/171210002";
import { summaries as relaxBlackoutSummaries, getDetail as getRelaxBlackoutDetail } from "./families/home-deco/curtain-blind/171210003";
import { summaries as shinyLunaBlindSummaries, getDetail as getShinyLunaBlindDetail } from "./families/home-deco/curtain-blind/171211001";
import { summaries as doubleRollscreenSummaries, getDetail as getDoubleRollscreenDetail } from "./families/home-deco/curtain-blind/171211002";
import { summaries as newKlimtLampSummaries, getDetail as getNewKlimtLampDetail } from "./families/home-deco/deco/171310001";
import { summaries as oliviaLampSummaries, getDetail as getOliviaLampDetail } from "./families/home-deco/deco/171310002";
import { summaries as joyFloorLampSummaries, getDetail as getJoyFloorLampDetail } from "./families/home-deco/deco/171310003";
import { summaries as emmaSlubRugSummaries, getDetail as getEmmaSlubRugDetail } from "./families/home-deco/deco/171311001";
import { summaries as samkidsRoundRugSummaries, getDetail as getSamkidsRoundRugDetail } from "./families/home-deco/deco/171311002";
import { summaries as primeTuftingRugSummaries, getDetail as getPrimeTuftingRugDetail } from "./families/home-deco/deco/171311003";
import { summaries as sokSteelContainerSummaries, getDetail as getSokSteelContainerDetail } from "./families/home-deco/kitchen-organizer/171111001";
import { summaries as clearFoodContainerSummaries, getDetail as getClearFoodContainerDetail } from "./families/home-deco/kitchen-organizer/171111002";
import { summaries as clearGlassRiceContainerSummaries, getDetail as getClearGlassRiceContainerDetail } from "./families/home-deco/kitchen-organizer/171111003";
import { summaries as moonJarDiffuserSummaries, getDetail as getMoonJarDiffuserDetail } from "./families/home-deco/deco/171312001";
import { summaries as foseasonDiffuserSummaries, getDetail as getFoseasonDiffuserDetail } from "./families/home-deco/deco/171312002";
import { summaries as leatherTissueCoverSummaries, getDetail as getLeatherTissueCoverDetail } from "./families/home-deco/deco/171312003";
import { summaries as feltTissueCaseSummaries, getDetail as getFeltTissueCaseDetail } from "./families/home-deco/deco/171312004";
import { summaries as tarpaulinShoppingBagSummaries, getDetail as getTarpaulinShoppingBagDetail } from "./families/home-deco/deco/171312005";

type Getter = (id: string) => ProductDetail;

// 새 패밀리 추가 시: summaries import + Object.fromEntries 라인 한 줄씩 추가
const registry: Record<string, Getter> = {
  ...Object.fromEntries(monoBedSummaries.map((s) => [s.id, getMonoBedDetail])),
  ...Object.fromEntries(lunesoftBedSummaries.map((s) => [s.id, getLunesoftBedDetail])),
  ...Object.fromEntries(steadyCompySummaries.map((s) => [s.id, getSteadyCompyDetail])),
  ...Object.fromEntries(balanceSEurotopSummaries.map((s) => [s.id, getBalanceSEurotopDetail])),
  ...Object.fromEntries(stayTopperSummaries.map((s) => [s.id, getStayTopperDetail])),
  ...Object.fromEntries(comfortBaseSummaries.map((s) => [s.id, getComfortBaseDetail])),
  ...Object.fromEntries(foseasonBaseSummaries.map((s) => [s.id, getFoseasonBaseDetail])),
  ...Object.fromEntries(monoDresserSummaries.map((s) => [s.id, getMonoDresserDetail])),
  ...Object.fromEntries(monoChestSummaries.map((s) => [s.id, getMonoChestDetail])),
  ...Object.fromEntries(euroNightstandSummaries.map((s) => [s.id, getEuroNightstandDetail])),
  ...Object.fromEntries(moaSofaSummaries.map((s) => [s.id, getMoaSofaDetail])),
  ...Object.fromEntries(ridoSofaSummaries.map((s) => [s.id, getRidoSofaDetail])),
  ...Object.fromEntries(mvmeReclineSummaries.map((s) => [s.id, getMvmeReclineDetail])),
  ...Object.fromEntries(hyuModeSummaries.map((s) => [s.id, getHyuModeDetail])),
  ...Object.fromEntries(hyuLoungeSummaries.map((s) => [s.id, getHyuLoungeDetail])),
  ...Object.fromEntries(lagoneSummaries.map((s) => [s.id, getLagoneDetail])),
  ...Object.fromEntries(pringleSummaries.map((s) => [s.id, getPringleDetail])),
  ...Object.fromEntries(clintLiftupSummaries.map((s) => [s.id, getClintLiftupDetail])),
  ...Object.fromEntries(jackRoundSummaries.map((s) => [s.id, getJackRoundDetail])),
  ...Object.fromEntries(clintHeightSummaries.map((s) => [s.id, getClintHeightDetail])),
  ...Object.fromEntries(clintUrbanCabSummaries.map((s) => [s.id, getClintUrbanCabDetail])),
  ...Object.fromEntries(clintModernCabSummaries.map((s) => [s.id, getClintModernCabDetail])),
  ...Object.fromEntries(pleatsCabSummaries.map((s) => [s.id, getPleatsCabDetail])),
  ...Object.fromEntries(milanAvCabSummaries.map((s) => [s.id, getMilanAvCabDetail])),
  ...Object.fromEntries(donoEdgeSummaries.map((s) => [s.id, getDonoEdgeDetail])),
  ...Object.fromEntries(foreComfortSummaries.map((s) => [s.id, getForeComfortDetail])),
  ...Object.fromEntries(minaNaturalOvalTableSummaries.map((s) => [s.id, getMinaNaturalOvalTableDetail])),
  ...Object.fromEntries(minaSteelSquareTableSummaries.map((s) => [s.id, getMinaSteelSquareTableDetail])),
  ...Object.fromEntries(donoSlimDiningChairSummaries.map((s) => [s.id, getDonoSlimDiningChairDetail])),
  ...Object.fromEntries(minaRoundDiningChairSummaries.map((s) => [s.id, getMinaRoundDiningChairDetail])),
  ...Object.fromEntries(widRoundDiningChairSummaries.map((s) => [s.id, getWidRoundDiningChairDetail])),
  ...Object.fromEntries(heardLeatherBarChairSummaries.map((s) => [s.id, getHeardLeatherBarChairDetail])),
  ...Object.fromEntries(euro501FlatBarChairSummaries.map((s) => [s.id, getEuro501FlatBarChairDetail])),
  ...Object.fromEntries(libupBenchSummaries.map((s) => [s.id, getLibupBenchDetail])),
  ...Object.fromEntries(blancChairStoolSummaries.map((s) => [s.id, getBlancChairStoolDetail])),
  ...Object.fromEntries(modiPantryCabinetSummaries.map((s) => [s.id, getModiPantryCabinetDetail])),
  ...Object.fromEntries(modiCafeCabinetSeriesSummaries.map((s) => [s.id, getModiCafeCabinetSeriesDetail])),
  ...Object.fromEntries(modiRangeStandSeriesSummaries.map((s) => [s.id, getModiRangeStandSeriesDetail])),
  ...Object.fromEntries(softCoolingSetSummaries.map((s) => [s.id, getSoftCoolingSetDetail])),
  ...Object.fromEntries(modalAllergySetSummaries.map((s) => [s.id, getModalAllergySetDetail])),
  ...Object.fromEntries(foseasonTencelSetSummaries.map((s) => [s.id, getFoseasonTencelSetDetail])),
  ...Object.fromEntries(polandGooseSummaries.map((s) => [s.id, getPolandGooseDetail])),
  ...Object.fromEntries(balanceGoosePillowSummaries.map((s) => [s.id, getBalanceGoosePillowDetail])),
  ...Object.fromEntries(sleepdiverPillowSummaries.map((s) => [s.id, getSleepdiverPillowDetail])),
  ...Object.fromEntries(sokSlidingBoxSummaries.map((s) => [s.id, getSokSlidingBoxDetail])),
  ...Object.fromEntries(allstenDishRackSummaries.map((s) => [s.id, getAllstenDishRackDetail])),
  ...Object.fromEntries(primeKnifeRackSummaries.map((s) => [s.id, getPrimeKnifeRackDetail])),
  ...Object.fromEntries(windowPackageSummaries.map((s) => [s.id, getWindowPackageDetail])),
  ...Object.fromEntries(cozyCurtainSummaries.map((s) => [s.id, getCozyCurtainDetail])),
  ...Object.fromEntries(relaxBlackoutSummaries.map((s) => [s.id, getRelaxBlackoutDetail])),
  ...Object.fromEntries(shinyLunaBlindSummaries.map((s) => [s.id, getShinyLunaBlindDetail])),
  ...Object.fromEntries(doubleRollscreenSummaries.map((s) => [s.id, getDoubleRollscreenDetail])),
  ...Object.fromEntries(newKlimtLampSummaries.map((s) => [s.id, getNewKlimtLampDetail])),
  ...Object.fromEntries(oliviaLampSummaries.map((s) => [s.id, getOliviaLampDetail])),
  ...Object.fromEntries(joyFloorLampSummaries.map((s) => [s.id, getJoyFloorLampDetail])),
  ...Object.fromEntries(emmaSlubRugSummaries.map((s) => [s.id, getEmmaSlubRugDetail])),
  ...Object.fromEntries(samkidsRoundRugSummaries.map((s) => [s.id, getSamkidsRoundRugDetail])),
  ...Object.fromEntries(primeTuftingRugSummaries.map((s) => [s.id, getPrimeTuftingRugDetail])),
  ...Object.fromEntries(sokSteelContainerSummaries.map((s) => [s.id, getSokSteelContainerDetail])),
  ...Object.fromEntries(clearFoodContainerSummaries.map((s) => [s.id, getClearFoodContainerDetail])),
  ...Object.fromEntries(clearGlassRiceContainerSummaries.map((s) => [s.id, getClearGlassRiceContainerDetail])),
  ...Object.fromEntries(moonJarDiffuserSummaries.map((s) => [s.id, getMoonJarDiffuserDetail])),
  ...Object.fromEntries(foseasonDiffuserSummaries.map((s) => [s.id, getFoseasonDiffuserDetail])),
  ...Object.fromEntries(leatherTissueCoverSummaries.map((s) => [s.id, getLeatherTissueCoverDetail])),
  ...Object.fromEntries(feltTissueCaseSummaries.map((s) => [s.id, getFeltTissueCaseDetail])),
  ...Object.fromEntries(tarpaulinShoppingBagSummaries.map((s) => [s.id, getTarpaulinShoppingBagDetail])),
};

export function getProductDetail(id: string): ProductDetail | null {
  const getter = registry[id];
  return getter ? getter(id) : null;
}
