import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  // ── 회전형 라운지 좌식리클라이너 아이보리 ──
  {
    id: "r-a01",
    userName: "nb*****",
    rating: 5,
    date: "2026.06.18",
    variant: "아이보리",
    content: "회전 기능이 너무 편해요. TV 볼 때는 정면, 대화할 때는 돌려서 사용하니까 활용도가 높아요. 라운지 자세로 리클라이닝하면 허리와 다리가 완전히 이완되는 느낌이에요. 좌식 특성상 낮은 눈높이로 TV 시청해도 불편하지 않습니다.",
  },
  {
    id: "r-a02",
    userName: "el*****",
    rating: 5,
    date: "2026.06.10",
    variant: "아이보리",
    content: "바닥 생활하는 저한테 완벽한 아이템이에요. 360도 회전이 되니까 거실 어느 방향에 앉아도 자유롭고, 리클라이닝하면 허리도 편합니다. 아이보리 색상도 깔끔하고 예뻐요. 다음에 하나 더 살 예정이에요.",
  },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [];
