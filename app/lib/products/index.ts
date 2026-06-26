import type { ProductDetail } from "../types";
import { summaries as monoBedSummaries, getDetail as getMonoBedDetail } from "./families/bedroom/bed/101012001";
import { summaries as monoDresserSummaries, getDetail as getMonoDresserDetail } from "./families/bedroom/dresser/101210001";
import { summaries as monoChestSummaries, getDetail as getMonoChestDetail } from "./families/bedroom/dresser/101210002";
import { summaries as euroNightstandSummaries, getDetail as getEuroNightstandDetail } from "./families/bedroom/dresser/101212001";
import { summaries as moaSofaSummaries, getDetail as getMoaSofaDetail } from "./families/livingroom/sofa/111012001";

type Getter = (id: string) => ProductDetail;

// 새 패밀리 추가 시: summaries import + Object.fromEntries 라인 한 줄씩 추가
const registry: Record<string, Getter> = {
  ...Object.fromEntries(monoBedSummaries.map((s) => [s.id, getMonoBedDetail])),
  ...Object.fromEntries(monoDresserSummaries.map((s) => [s.id, getMonoDresserDetail])),
  ...Object.fromEntries(monoChestSummaries.map((s) => [s.id, getMonoChestDetail])),
  ...Object.fromEntries(euroNightstandSummaries.map((s) => [s.id, getEuroNightstandDetail])),
  ...Object.fromEntries(moaSofaSummaries.map((s) => [s.id, getMoaSofaDetail])),
};

export function getProductDetail(id: string): ProductDetail | null {
  const getter = registry[id];
  return getter ? getter(id) : null;
}
