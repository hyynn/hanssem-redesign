import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

// 12 reviews: 8×5 + 4×4 = avg 4.667 → 4.7
const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "lh*****",
    rating: 5,
    date: "2026.05.20",
    variant: "기본",
    content: "미드센추리 감성이 살아있고 거실에 잘 어울려요. 배송도 빠르고 설치도 깔끔했습니다.",
    images: ["/images/reviews/1111110020/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "kw*****",
    rating: 5,
    date: "2026.04.11",
    variant: "기본",
    content: "프리미엄 느낌 물씬 납니다. 상판이 두껍고 묵직해요.",
    images: ["/images/reviews/1111110020/review-02-1.webp"],
  },
  {
    id: "r-a03",
    userName: "sy*****",
    rating: 5,
    date: "2026.03.05",
    variant: "기본",
    content: "디자인이 고급스럽고 소파랑 잘 어울립니다. 주변에서 어디서 샀냐고 물어봐요.",
  },
  {
    id: "r-a04",
    userName: "mj*****",
    rating: 5,
    date: "2026.01.22",
    variant: "기본",
    content: "묵직하고 견고합니다. 생각보다 크기가 적당해서 좋아요.",
  },
  {
    id: "r-a05",
    userName: "tj*****",
    rating: 5,
    date: "2025.12.14",
    variant: "기본",
    content: "색감이 사진과 동일합니다. 인테리어 분위기가 확 달라졌어요.",
    images: ["/images/reviews/1111110020/review-05-1.webp"],
  },
  {
    id: "r-a06",
    userName: "hp*****",
    rating: 5,
    date: "2025.11.03",
    variant: "기본",
    content: "마감이 깔끔하고 표면 코팅이 잘 되어 있어요.",
  },
  {
    id: "r-a07",
    userName: "yw*****",
    rating: 5,
    date: "2025.09.18",
    variant: "기본",
    content: "모던하고 세련된 디자인입니다. 가격이 좀 있지만 그만한 값어치를 합니다.",
  },
  {
    id: "r-a08",
    userName: "ch*****",
    rating: 5,
    date: "2025.08.07",
    variant: "기본",
    content: "공간이 확 살아납니다. 재구매 의사 있어요.",
  },
  {
    id: "r-a09",
    userName: "rb*****",
    rating: 4,
    date: "2025.07.21",
    variant: "기본",
    content: "예쁘고 품질도 좋은데 색상이 다양하면 좋겠어요,",
  },
  {
    id: "r-a10",
    userName: "nj*****",
    rating: 4,
    date: "2025.06.30",
    variant: "기본",
    content: "전체적으로 만족스럽습니다. 다만 배송 날짜 협의가 조금 아쉬웠어요.",
  },
  {
    id: "r-a11",
    userName: "os*****",
    rating: 4,
    date: "2025.05.11",
    variant: "기본",
    content: "디자인은 좋습니다. 조금 더 큰 사이즈도 있으면 좋겠어요.",
  },
  {
    id: "r-a12",
    userName: "pm*****",
    rating: 4,
    date: "2025.03.28",
    variant: "기본",
    content: "가격 대비 만족스럽습니다.",
  },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [];
