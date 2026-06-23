import type { ProductDetail } from "../types";
import { monoBedFamily, createSections, sharedReviews, sharedQnaItems } from "./families/mono-bed";
import { catalog, getSiblings } from "../catalog";

const id = "1010120011";
const summary = catalog.find((p) => p.id === id)!;

const product: ProductDetail = {
  ...summary,
  ...monoBedFamily,
  // 메인과 동일 사이즈, 매트리스 미포함
  variantImages: [],
  filterAttributes: { size: ["KK"], config: ["침대"], feature: ["조명리모컨형"] },
  siblings: getSiblings("mono-bed"),
  sections: createSections({
    title: "모노 침대 KK 단품",
    body: "감각적인 모노톤 컬러에 낮고 와이드한 비례미, 패널까지 이어지는 풍부한 헤드 조명으로 미니멀하면서 트렌디한 호텔 침실을 완성합니다. 매트리스는 별도 구매하시거나 기존 보유 매트리스와 함께 사용 가능합니다.",
  }),
  reviews: sharedReviews,
  qnaItems: sharedQnaItems,
};

export default product;
