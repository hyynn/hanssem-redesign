import type { ProductDetail } from "../types";
import { monoBedFamily, createSections, sharedReviews, sharedQnaItems } from "./families/mono-bed";
import { catalog, getSiblings } from "../catalog";
import { getFamilyFolder } from "./families";

const id = "1010120012";
const summary = catalog.find((p) => p.id === id)!;
const familyFolder = getFamilyFolder(id);

const product: ProductDetail = {
  ...summary,
  ...monoBedFamily,
  // Q/K + 매트리스 전용: 매트리스 클로즈업, Q/K 사이즈 도표
  variantImages: [
    `/images/products/${familyFolder}/${id}/${id}-variant-01.webp`,
    `/images/products/${familyFolder}/${id}/${id}-variant-02.webp`,
  ],
  filterAttributes: { size: ["Q/K"], config: ["침대+매트"], feature: ["조명리모컨형"] },
  siblings: getSiblings("mono-bed"),
  sections: createSections({
    title: "모노 침대 Q/K + 밸런스 매트리스",
    body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다.",
  }),
  reviews: sharedReviews,
  qnaItems: sharedQnaItems,
};

export default product;
