import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "bn*****",
    rating: 5,
    date: "2026.07.14",
    variant: "M 화이트",
    content: "장 보러 갈 때마다 들고 다니는데 정말 튼튼해요. 방수라 물기 있는 채소를 담아도 걱정이 없습니다.",
    images: ["/images/reviews/1713120050/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "os*****",
    rating: 4,
    date: "2026.06.20",
    variant: "L 블랙",
    content: "L 사이즈로 주문했는데 짐이 많을 때 딱 좋아요. 블랙 컬러라 캠핑 짐 정리용으로도 무난하게 씁니다.",
  },
  {
    id: "r-a03",
    userName: "we*****",
    rating: 5,
    date: "2026.05.27",
    variant: "M 화이트",
    content: "생각보다 훨씬 튼튼해서 무거운 짐도 잘 버텨줘요. 접어서 보관할 수 있어 공간도 많이 차지하지 않습니다.",
  },
  {
    id: "r-a04",
    userName: "kt*****",
    rating: 3,
    date: "2026.05.02",
    variant: "L 블랙",
    content: "튼튼하긴 한데 손잡이 길이가 조금 짧게 느껴져서 어깨에 메기는 불편해요. 손으로 드는 용도로는 괜찮습니다.",
  },
  {
    id: "r-a05",
    userName: "dr*****",
    rating: 5,
    date: "2026.04.08",
    variant: "M 화이트",
    content: "가격도 저렴한데 이 정도 방수력이면 정말 만족스러워요. 세컨백으로 하나 더 주문할 예정입니다.",
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
    question: "M 사이즈와 L 사이즈 실측 차이가 어느 정도 되나요?",
    questioner: "hy*****",
    date: "2026.06.05",
    answered: false,
  },
];
