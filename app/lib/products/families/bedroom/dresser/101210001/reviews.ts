import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "pa*****",
    rating: 5,
    date: "2026.05.01",
    variant: "차콜",
    content: "침대, 서랍, 화장대까지 한샘 호텔모노 차콜로 통일했어요~ 진짜 안방이 호텔분위기가 나고 서랍도 유용하게 칸이 나눠져있어서 좋아요. 메탈 프레임 다리도 깔끔하고 튼튼해서 좋습니다.",
    images: ["/images/reviews/1012100011/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "bj*****",
    rating: 5,
    date: "2026.04.13",
    variant: "화이트",
    content: "컬러, 품질 모두 만족합니다. 완전 화이트가 아니고 톤 다운된 컬러라 세련되어 보이고 깔끔합니다. 기사님들 너무 친절하시고 깔끔하게 잘 설치해 주셨습니다.",
    images: ["/images/reviews/1012100010/review-02-1.webp"],
  },
  {
    id: "r-a03",
    userName: "kh*****",
    rating: 5,
    date: "2026.01.25",
    variant: "화이트",
    content: "깔끔하고 튼튼해 보이고 예뻐요",
  },
  {
    id: "r-a04",
    userName: "cy*****",
    rating: 5,
    date: "2025.12.17",
    variant: "화이트",
    content: "이쁘고 사용하기에 편리하고 좋아요 추천드립니다",
  },
  {
    id: "r-a05",
    userName: "kz*****",
    rating: 5,
    date: "2025.10.15",
    variant: "차콜",
    content: "서랍장과 세트로 구매했어요 서랍이 생각보다 깊어서 수납력 좋아요",
    images: ["/images/reviews/1012100011/review-05-1.webp"],
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
    question: "화장대 서랍 안 수납 높이는 몇 센티인가요?",
    questioner: "ky*****",
    date: "2025.11.16",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 내부 서랍 높이는 약 12cm입니다.",
    answerDate: "2025.11.17",
  },
];
