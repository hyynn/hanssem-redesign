import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "km*****",
    rating: 5,
    date: "2026.07.03",
    variant: "2P",
    content: "아침마다 목이 뻐근했는데 이 베개로 바꾸고 확실히 덜해요. 단차 구조가 처음엔 어색했는데 사흘 만에 적응됐습니다.",
    images: ["/images/reviews/1710110020/review-01-1.webp", "/images/reviews/1710110020/review-01-2.webp"],
  },
  {
    id: "r-a02",
    userName: "ju*****",
    rating: 4,
    date: "2026.06.26",
    variant: "2P",
    content: "부부용으로 딱 좋은 구성이에요. 남편은 만족하는데 저한테는 목 부분이 살짝 높은 느낌이라 별 하나 뺐습니다.",
  },
  {
    id: "r-a03",
    userName: "sd*****",
    rating: 5,
    date: "2026.06.19",
    variant: "2P",
    content: "거북목 때문에 경추 베개만 몇 개째인데 화이바 소재 중에는 제일 낫습니다. 2개 세트라 가격 부담도 적어요.",
  },
  {
    id: "r-a04",
    userName: "hj*****",
    rating: 5,
    date: "2026.06.12",
    variant: "2P",
    content: "메모리폼은 여름에 덥고 냄새가 있었는데 이건 통기성이 좋아서 쾌적해요. 세탁 가능한 것도 큰 장점입니다.",
    images: ["/images/reviews/1710110020/review-04-1.webp"],
  },
  {
    id: "r-a05",
    userName: "bo*****",
    rating: 3,
    date: "2026.06.05",
    variant: "2P",
    content: "지지력은 괜찮은데 생각보다 푹신함은 덜해요. 폭신한 베개 좋아하시는 분께는 안 맞을 수 있습니다.",
  },
  {
    id: "r-a06",
    userName: "yc*****",
    rating: 5,
    date: "2026.05.29",
    variant: "2P",
    content: "재택근무로 목이 항상 무거웠는데 자고 일어나면 한결 가벼워요. 뒤척여도 목이 꺾이지 않는 게 느껴집니다.",
  },
  {
    id: "r-a07",
    userName: "ng*****",
    rating: 4,
    date: "2026.05.22",
    variant: "2P",
    content: "기능은 만족스러운데 전용 커버가 아니면 단차 모양이 살짝 뜹니다. 신축성 있는 커버를 쓰니 해결됐어요.",
  },
  {
    id: "r-a08",
    userName: "pr*****",
    rating: 5,
    date: "2026.05.15",
    variant: "2P",
    content: "부모님 어버이날 선물로 드렸는데 목이 편하다고 전화가 왔어요. 하나는 게스트룸에 두고 잘 쓰고 있습니다.",
    images: ["/images/reviews/1710110020/review-08-1.webp"],
  },
  {
    id: "r-a09",
    userName: "ta*****",
    rating: 5,
    date: "2026.05.08",
    variant: "2P",
    content: "세탁기에 돌려도 형태가 안 무너져서 놀랐어요. 위생에 민감한 편인데 자주 빨 수 있어 마음이 편합니다.",
  },
  {
    id: "r-a10",
    userName: "es*****",
    rating: 4,
    date: "2026.04.30",
    variant: "2P",
    content: "적응 기간이 일주일 정도 필요했지만 지금은 다른 베개를 못 쓰겠어요. 배송이 하루 늦은 건 아쉬웠습니다.",
  },
  {
    id: "r-a11",
    userName: "wl*****",
    rating: 5,
    date: "2026.04.23",
    variant: "2P",
    content: "이 가격에 경추 베개 2개면 무조건 이득이에요. 커버까지 씌우니 호텔 침구 부럽지 않습니다.",
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
    question: "메모리폼 경추 베개랑 비교하면 지지력이 어느 정도인가요?",
    questioner: "dv*****",
    date: "2026.06.08",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 마이크로화이바 특성상 메모리폼보다 부드러운 지지감을 제공하며, 단차 설계로 경추 라인 유지 기능은 동일하게 구현했습니다. 단단한 지지감을 선호하시면 참고 부탁드립니다. 감사합니다.",
    answerDate: "2026.06.09",
  },
  {
    id: "q-a02",
    category: "상품",
    question: "베개 1개만 따로 구매할 수는 없나요?",
    questioner: "fk*****",
    date: "2026.06.28",
    answered: false,
  },
];
