import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "hj*****",
    rating: 5,
    date: "2026.07.15",
    variant: "블랙",
    content: "인더스트리얼한 느낌으로 홈바를 꾸미고 싶어서 골랐는데 딱 원하던 느낌이에요. 여러 개 겹쳐서 보관할 수 있는 것도 장점입니다.",
    images: ["/images/reviews/1211110020/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "sm*****",
    rating: 4,
    date: "2026.06.24",
    variant: "화이트",
    content: "디자인은 세련된데 앉아보니 시트가 조금 딱딱한 편이에요. 그래도 스타일리시해서 만족합니다.",
  },
  {
    id: "r-a03",
    userName: "kt*****",
    rating: 5,
    date: "2026.06.02",
    variant: "블랙",
    content: "철제 프레임이라 그런지 튼튼하고 무게감도 적당해요. 카페 느낌 인테리어에 딱입니다.",
    images: ["/images/reviews/1211110020/review-03-1.webp"],
  },
  {
    id: "r-a04",
    userName: "yn*****",
    rating: 3,
    date: "2026.05.10",
    variant: "화이트",
    content: "디자인은 마음에 드는데 오래 앉아있으면 조금 불편해요. 짧게 앉는 용도로는 괜찮습니다.",
  },
  {
    id: "r-a05",
    userName: "dw*****",
    rating: 4,
    date: "2026.04.18",
    variant: "블랙",
    content: "가벼워서 옮기기 편하고 스택으로 보관도 가능해서 좋아요. 시트 쿠션은 조금 아쉽습니다.",
  },
  {
    id: "r-a06",
    userName: "bg*****",
    rating: 5,
    date: "2026.03.27",
    variant: "화이트",
    content: "화이트 컬러가 밝은 주방이랑 잘 어울려요. 마감도 깔끔한 편입니다.",
    images: ["/images/reviews/1211110020/review-06-1.webp"],
  },
  {
    id: "r-a07",
    userName: "ej*****",
    rating: 3,
    date: "2026.03.05",
    variant: "블랙",
    content: "제품 자체는 나쁘지 않은데 가격 대비 구성이 단순한 느낌이에요. 디자인만 보고 구매하기엔 괜찮습니다.",
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
    question: "쿠션이 없는 하드 시트인가요?",
    questioner: "dg*****",
    date: "2026.06.10",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 별도 쿠션 없이 스틸 시트 그대로의 플랫한 디자인입니다. 장시간 착석보다는 짧은 시간 이용에 적합합니다. 감사합니다.",
    answerDate: "2026.06.11",
  },
  {
    id: "q-a02",
    category: "배송",
    question: "야외에서도 사용 가능한가요?",
    questioner: "sk*****",
    date: "2026.07.10",
    answered: false,
  },
];
