import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "jn*****",
    rating: 5,
    date: "2026.06.28",
    variant: "320ml 3P",
    content: "밥을 미리 소분해서 냉동해두고 필요할 때 뚜껑만 열어 전자레인지에 데워 먹어요. 유리라 냄새도 안 배고 깨끗합니다.",
  },
  {
    id: "r-a02",
    userName: "qm*****",
    rating: 4,
    date: "2026.05.19",
    variant: "236ml 3P",
    content: "236ml는 이유식 소분용으로 쓰고 있는데 크기가 딱 맞아요. 다만 유리라 무게가 있어서 여러 개 들 때는 조심스럽습니다.",
  },
  {
    id: "r-a03",
    userName: "ve*****",
    rating: 3,
    date: "2026.04.11",
    variant: "320ml 3P",
    content: "제품은 만족스러운데 배송 중 완충재가 부족했는지 뚜껑에 미세한 흠집이 있었어요. 사용에는 지장 없어서 그대로 쓰고 있습니다.",
  },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [
  {
    id: "q-a01",
    category: "상품",
    question: "뚜껑도 전자레인지에 같이 사용할 수 있나요?",
    questioner: "oc*****",
    date: "2026.05.07",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 뚜껑은 실리콘·PP 소재로 전자레인지 사용이 불가하니, 데울 때는 뚜껑을 분리한 후 유리 용기만 사용해 주세요. 감사합니다.",
    answerDate: "2026.05.08",
  },
];
