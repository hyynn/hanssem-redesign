import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  // ── SS ──
  {
    id: "r-a01",
    userName: "kw*****",
    rating: 5,
    date: "2026.06.16",
    variant: "SS",
    content: "토퍼와 함께 사용 중인데 조합이 아주 좋아요. 하단 매트리스 지지력이 탄탄해서 위에 올린 토퍼를 잘 받쳐줍니다. 수면 환경이 많이 개선됐어요.",
    images: ["/images/reviews/1011120020/review-01-1.webp", "/images/reviews/1011120020/review-01-2.webp"],
  },
  {
    id: "r-a02",
    userName: "fo*****",
    rating: 5,
    date: "2026.06.04",
    variant: "SS",
    content: "하단 매트리스라 단독 사용보단 위에 토퍼를 올려야 더 편하더라고요. 지지력은 정말 훌륭합니다. 꺼짐 없이 균일한 면이 마음에 들어요.",
  },
  {
    id: "r-a03",
    userName: "tp*****",
    rating: 5,
    date: "2026.05.22",
    variant: "SS",
    content: "한샘 토퍼랑 같이 쓰려고 구매했어요. 조합이 딱 맞고 높이도 적절해요. 배송 기사님이 친절하게 올려주셨습니다.",
    images: ["/images/reviews/1011120020/review-03-1.webp"],
  },
  {
    id: "r-a04",
    userName: "ua*****",
    rating: 4,
    date: "2026.05.10",
    variant: "SS",
    content: "지지력은 좋은데 단독 사용하기엔 조금 딱딱하게 느껴질 수 있어요. 토퍼 조합 필수라고 생각하고 구매하시면 만족하실 거예요.",
  },
  {
    id: "r-a05",
    userName: "rc*****",
    rating: 5,
    date: "2026.04.28",
    variant: "SS",
    content: "SS 사이즈 딱 맞아요. 하단 매트리스인데도 마감이 깔끔하고 소재가 튼튼한 느낌이에요. 오래 쓸 수 있을 것 같습니다.",
  },
  {
    id: "r-a06",
    userName: "nd*****",
    rating: 5,
    date: "2026.04.15",
    variant: "SS",
    content: "스프링 내구성이 좋아 보여요. 한 달 사용 후에도 꺼짐이나 변형 없이 처음 상태 그대로예요. 만족스러운 구매입니다.",
  },
  {
    id: "r-a07",
    userName: "bq*****",
    rating: 4,
    date: "2026.04.02",
    variant: "SS",
    content: "배송이 생각보다 일찍 와서 좋았어요. 포장도 꼼꼼하게 되어있고 제품 상태도 좋습니다. 토퍼랑 조합해서 잘 사용 중이에요.",
  },
  {
    id: "r-a08",
    userName: "ze*****",
    rating: 5,
    date: "2026.03.24",
    variant: "SS",
    content: "가격 대비 만족도가 높아요. 한샘 브랜드를 믿고 구매했는데 역시 실망 없습니다. 마감이 깔끔하고 지지력이 좋아요.",
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
    question: "하단 매트리스 단독 사용이 가능한가요, 아니면 반드시 위에 토퍼를 올려야 하나요?",
    questioner: "xe*****",
    date: "2026.06.08",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 컴포트 하단 매트리스는 단독 사용도 가능하나, 포켓스프링 구조 특성상 지지력 중심으로 설계되어 있어 위에 토퍼를 올려 사용하시면 훨씬 편안한 수면을 경험하실 수 있습니다. 한샘 스테이 리버서블 토퍼와의 조합을 추천드립니다.",
    answerDate: "2026.06.09",
  },
  {
    id: "q-a02",
    category: "배송",
    question: "SS 사이즈도 직배송인가요? 배송기간이 어떻게 되나요?",
    questioner: "al*****",
    date: "2026.05.30",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 컴포트 하단 매트리스는 전문 배송팀이 직접 배송하며, 주문 후 2~3주 내 순차적으로 배송됩니다. 배송 3~5일 전 담당 배송팀에서 사전 연락을 드립니다.",
    answerDate: "2026.05.31",
  },
  {
    id: "q-a03",
    category: "상품",
    question: "침대 프레임 없이 바닥에 직접 놓고 사용해도 되나요?",
    questioner: "wv*****",
    date: "2026.06.18",
    answered: false,
  },
];
