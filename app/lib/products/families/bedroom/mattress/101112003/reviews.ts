import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  // ── SS ──
  {
    id: "r-a01",
    userName: "im*****",
    rating: 5,
    date: "2026.06.19",
    variant: "SS",
    content: "포시즌 베이스 위에 가지고 있던 토퍼 올렸는데 조합이 정말 좋아요. 높이가 딱 적당하고 마감도 깔끔합니다. 침실 분위기가 달라졌어요.",
    images: ["/images/reviews/1011120030/review-01-1.webp", "/images/reviews/1011120030/review-01-2.webp"],
  },
  {
    id: "r-a02",
    userName: "sy*****",
    rating: 5,
    date: "2026.06.10",
    variant: "SS",
    content: "베이스라 지지력이 탄탄해요. 기존에 쓰던 토퍼를 올렸는데 딱 맞고 안정감 있어요. 가격 대비 만족도 높습니다.",
  },
  {
    id: "r-a03",
    userName: "ge*****",
    rating: 5,
    date: "2026.05.29",
    variant: "SS",
    content: "한샘 매장에서 직접 확인하고 주문했어요. 실물이 더 탄탄한 느낌이에요. 배송기사님이 친절하게 올려주셔서 감사했어요.",
    images: ["/images/reviews/1011120030/review-03-1.webp"],
  },
  {
    id: "r-a04",
    userName: "vk*****",
    rating: 4,
    date: "2026.05.18",
    variant: "SS",
    content: "베이스 단독으로는 조금 딱딱하지만 토퍼 조합 시 완벽해요. 내구성이 좋아 보여서 오래 쓸 수 있을 것 같습니다.",
  },
  {
    id: "r-a05",
    userName: "ot*****",
    rating: 5,
    date: "2026.05.07",
    variant: "SS",
    content: "이름처럼 사계절 내내 쾌적하게 사용할 수 있을 것 같아요. 통기성 좋은 소재라 여름에도 쾌적하고 겨울에도 따뜻해요.",
    images: ["/images/reviews/1011120030/review-05-1.webp"],
  },
  {
    id: "r-a06",
    userName: "dz*****",
    rating: 4,
    date: "2026.04.25",
    variant: "SS",
    content: "배송이 약속 날짜에 맞춰 잘 왔어요. 포장 상태도 양호하고 제품에 문제 없습니다. 한샘 품질답게 마감이 깔끔해요.",
    images: ["/images/reviews/1011120030/review-06-1.webp"],
  },
  {
    id: "r-a07",
    userName: "kl*****",
    rating: 5,
    date: "2026.04.14",
    variant: "SS",
    content: "SS 사이즈 딱 맞게 왔어요. 한샘 토퍼랑 같이 세팅했는데 완벽한 수면 환경이 됐어요. 침대 높이도 딱 제가 원하는 높이예요.",
  },
  {
    id: "r-a08",
    userName: "wx*****",
    rating: 4,
    date: "2026.04.03",
    variant: "SS",
    content: "단독 사용보단 조합용으로 구매하시길 추천드려요. 베이스 역할을 충실하게 해줍니다. 지지력이 좋고 꺼짐이 없어요.",
  },
  {
    id: "r-a09",
    userName: "cb*****",
    rating: 3,
    date: "2026.03.26",
    variant: "SS",
    content: "지지력은 좋은데 생각보다 무거워서 혼자 설치하기 힘들었어요. 배송팀이 올려줬으면 편했을 것 같아요. 제품 자체는 나쁘지 않아요.",
  },
  {
    id: "r-a10",
    userName: "hf*****",
    rating: 5,
    date: "2026.03.16",
    variant: "SS",
    content: "장기적으로 쓸 베이스로 구매했어요. 스프링이 견고하고 마감이 깔끔해서 만족입니다. 위에 토퍼 올리면 완성이에요.",
  },
  {
    id: "r-a11",
    userName: "jb*****",
    rating: 5,
    date: "2026.03.08",
    variant: "SS",
    content: "한샘 브랜드 처음 써봤는데 품질이 정말 좋네요. 포시즌 베이스라 통기성이 좋고 계절 구분 없이 편안하게 사용하고 있어요.",
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
    question: "포시즌 하단 베이스만 단독으로 사용 가능한가요? 아니면 반드시 위에 매트리스를 올려야 하나요?",
    questioner: "rv*****",
    date: "2026.06.10",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 포시즌 하단 베이스는 단독 사용보다는 위에 토퍼 또는 매트리스를 올려 사용하는 것을 권장합니다. 지지층으로 설계된 제품으로, 위에 부드러운 쿠션층을 더하면 최상의 수면 환경을 만들 수 있습니다.",
    answerDate: "2026.06.11",
  },
  {
    id: "q-a02",
    category: "상품",
    question: "포시즌이라는 이름의 의미가 무엇인가요? 계절마다 다르게 사용하는 건가요?",
    questioner: "iq*****",
    date: "2026.05.25",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 포시즌(Four Season)은 사계절 내내 쾌적하게 사용할 수 있다는 의미에서 붙여진 이름입니다. 통기성 좋은 소재를 사용해 여름에도 덥지 않고, 겨울에도 차갑지 않게 설계되었습니다. 별도로 뒤집거나 교체하는 기능은 없습니다.",
    answerDate: "2026.05.26",
  },
  {
    id: "q-a03",
    category: "배송",
    question: "한샘 컴포트 하단 매트리스와 포시즌 하단 베이스의 차이가 무엇인가요?",
    questioner: "mt*****",
    date: "2026.06.16",
    answered: false,
  },
];
