import type { ProductDetail } from "../types";
import { monoBedFamily, createSections, sharedReviews, sharedQnaItems } from "./families/mono-bed";
import { catalog, getSiblings } from "../catalog";
import { getFamilyFolder } from "./families";

const id = "1010120010";
const summary = catalog.find((p) => p.id === id)!;
const familyFolder = getFamilyFolder(id);

const product: ProductDetail = {
  ...summary,
  ...monoBedFamily,
  // Q/K 사이즈 도표 — 메인(KK)과 사이즈 다름
  variantImages: [],
  filterAttributes: { size: ["Q/K"], config: ["침대"], feature: ["조명리모컨형"] },
  siblings: getSiblings("mono-bed"),
  sections: createSections({
    title: "모노 침대 Q/K 단품",
    body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다. 퀸·킹 사이즈 모두 지원하며, 보유하신 매트리스와 함께 사용 가능합니다.",
  }),
  reviews: sharedReviews,
  qnaItems: sharedQnaItems,
};

export default product;
