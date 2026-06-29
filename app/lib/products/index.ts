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
};

export function getProductDetail(id: string): ProductDetail | null {
  const getter = registry[id];
  return getter ? getter(id) : null;
}
