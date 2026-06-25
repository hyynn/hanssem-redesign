import type { ProductDetail } from "../types";
import { summaries as monoBedSummaries, getDetail as getMonoBedDetail } from "./families/bedroom/bed/101012001";

type Getter = (id: string) => ProductDetail;

// 새 패밀리 추가 시: summaries import + Object.fromEntries 라인 한 줄씩 추가
const registry: Record<string, Getter> = {
  ...Object.fromEntries(monoBedSummaries.map((s) => [s.id, getMonoBedDetail])),
};

export function getProductDetail(id: string): ProductDetail | null {
  const getter = registry[id];
  return getter ? getter(id) : null;
}
