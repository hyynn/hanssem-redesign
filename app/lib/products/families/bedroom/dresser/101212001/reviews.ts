import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "ka*****",
    rating: 5,
    date: "2026.05.09",
    variant: "기본단품",
    content: "예쁘고 고급져서 추가 주문 예정이예요~",
    images: ["/images/reviews/1012120010/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "hj*****",
    rating: 5,
    date: "2025.02.17",
    variant: "기본단품",
    content: "잘 받았습니다 만족스럽습니다",
  },
  {
    id: "r-a03",
    userName: "oh*****",
    rating: 5,
    date: "2025.01.15",
    variant: "기본단품",
    content: "거실코너에 잘어울리는 심플하면서도 고급스러운 디자인으로 맘에듭니다",
    images: ["/images/reviews/1012120010/review-03-1.webp"],
  },
  {
    id: "r-a04",
    userName: "ly*****",
    rating: 5,
    date: "2024.11.12",
    variant: "기본단품",
    content: "침대와 잘어울립니다. 묵직하고 고급스러워요",
    images: ["/images/reviews/1012120010/review-04-1.webp"],
  },
  {
    id: "r-a05",
    userName: "kj*****",
    rating: 5,
    date: "2024.11.04",
    variant: "기본단품",
    content: "예쁘고 친절해요",
  },
  {
    id: "r-a06",
    userName: "hh*****",
    rating: 5,
    date: "2022.11.20",
    variant: "기본단품",
    content: "디자인 품질 모두 만족합니다.",
  },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [];
