import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  // ── SS ──
  {
    id: "r-a01",
    userName: "hj*****",
    rating: 5,
    date: "2026.06.18",
    variant: "SS",
    content: "기존 매트리스에 올려 사용하고 있어요. 메모리폼 특유의 감싸는 느낌이 좋고 양면 사용 가능해서 계절마다 뒤집어 쓸 수 있어 실용적입니다.",
    images: ["/images/reviews/1011120010/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "sk*****",
    rating: 5,
    date: "2026.06.05",
    variant: "SS",
    content: "메모리폼 두께가 생각보다 충분해서 아래 매트리스가 딱딱해도 푹신하게 자고 있어요. 압축 배송이라 빨리 와서 좋았어요.",
  },
  {
    id: "r-a03",
    userName: "py*****",
    rating: 5,
    date: "2026.05.24",
    variant: "SS",
    content: "리버서블이라 여름엔 시원한 면, 겨울엔 따뜻한 면 번갈아 사용 중이에요. 오래된 매트리스가 살아난 느낌이에요.",
  },
  {
    id: "r-a04",
    userName: "br*****",
    rating: 4,
    date: "2026.05.10",
    variant: "SS",
    content: "메모리폼 밀도가 충분해서 꺼지지 않고 잘 받쳐줘요. 처음엔 메모리폼 특유의 냄새가 조금 있었는데 환기 후 괜찮아졌어요.",
  },
  {
    id: "r-a05",
    userName: "gl*****",
    rating: 5,
    date: "2026.04.27",
    variant: "SS",
    content: "SS 사이즈 딱 맞아요. 아침에 일어났을 때 어깨나 허리 통증이 줄었어요. 체압 분산이 잘 되는 것 같습니다. 추천합니다.",
  },
  // ── Q ──
  {
    id: "r-b01",
    userName: "lc*****",
    rating: 5,
    date: "2026.06.20",
    variant: "Q",
    content: "퀸 사이즈 딱 맞게 잘 왔어요. 메모리폼이 체형에 맞게 눌려서 허리가 편안해요. 리버서블로 두 면 모두 써봤는데 취향에 따라 골라 쓰기 좋아요.",
    images: ["/images/reviews/1011120011/review-01-1.webp"],
  },
  {
    id: "r-b02",
    userName: "mn*****",
    rating: 5,
    date: "2026.06.08",
    variant: "Q",
    content: "압축 배송으로 왔는데 펼치고 24시간 후 완전히 복원되더라고요. 메모리폼이 포근하고 아이와 함께 자도 편안해요.",
  },
  {
    id: "r-b03",
    userName: "ow*****",
    rating: 5,
    date: "2026.05.26",
    variant: "Q",
    content: "가성비 정말 좋아요. 기존 딱딱한 매트리스 위에 올렸더니 완전히 다른 느낌이에요. 잠자리가 훨씬 편안해졌습니다.",
  },
  {
    id: "r-b04",
    userName: "jz*****",
    rating: 4,
    date: "2026.05.14",
    variant: "Q",
    content: "메모리폼이 체온에 반응해 살짝 따뜻하게 느껴지는데 여름엔 조금 더울 수 있어요. 리버서블로 시원한 면 사용하니 괜찮아졌어요.",
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
    question: "리버서블이라고 하는데 앞면과 뒷면의 차이가 무엇인가요? 어느 면이 더 시원한가요?",
    questioner: "vc*****",
    date: "2026.06.12",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 한 면은 통기성이 좋은 메시 소재로 여름에 시원하게 사용하기 적합하고, 반대 면은 부드러운 니트 소재로 겨울에 따뜻한 수면환경을 제공합니다. 계절에 따라 뒤집어 사용하시면 됩니다.",
    answerDate: "2026.06.13",
  },
];
