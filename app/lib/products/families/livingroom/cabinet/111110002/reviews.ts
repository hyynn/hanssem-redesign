import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

// 27 reviews: 19×5 + 8×4 = 127/27 ≈ 4.7
// group a: 일반형 수납장 (14건 — 10×5 + 4×4)
// group b: 서랍형 수납장 (13건 — 9×5 + 4×4)
const reviewItems: Review[] = [
  { id: "r-a01", userName: "hc*****", rating: 5, date: "2026.05.18", variant: "일반형 / 화이트", content: "높이가 있어서 수납력이 정말 좋아요. 거실 한 벽면을 꽉 채워주는 느낌입니다." },
  { id: "r-a02", userName: "mp*****", rating: 5, date: "2026.05.01", variant: "일반형 / 그린", content: "그린 컬러가 거실을 싱그럽게 만들어줘요. 200cm 높이라 수납량도 충분합니다." },
  { id: "r-a03", userName: "kw*****", rating: 5, date: "2026.04.12", variant: "일반형 / 그레이", content: "그레이 컬러가 모던한 인테리어에 완벽하게 맞습니다. 마감도 깔끔해요." },
  { id: "r-a04", userName: "ts*****", rating: 5, date: "2026.03.25", variant: "일반형 / 화이트", content: "80cm + 120cm 조합이라 코너 배치도 잘 돼요. 설치팀이 꼼꼼하게 해주셨습니다." },
  { id: "r-a05", userName: "ag*****", rating: 5, date: "2026.03.08", variant: "일반형 / 그린", content: "높은 거실장이 필요했는데 딱 맞는 제품이었어요. 상단 선반 활용도가 높습니다." },
  { id: "r-a06", userName: "bh*****", rating: 5, date: "2026.02.18", variant: "일반형 / 화이트", content: "200cm 높이지만 안정감이 있어요. 상하 분리 조합형이라 운반도 편했습니다." },
  { id: "r-a07", userName: "ci*****", rating: 5, date: "2026.01.30", variant: "일반형 / 그레이", content: "거실 인테리어가 완성된 느낌이에요. 품질이 가격에 비해 훨씬 좋습니다." },
  { id: "r-a08", userName: "dj*****", rating: 5, date: "2026.01.12", variant: "일반형 / 화이트", content: "개방형 선반에 책이나 소품 올려두니 인테리어 효과도 있어요." },
  { id: "r-a09", userName: "ek*****", rating: 5, date: "2025.12.24", variant: "일반형 / 그린", content: "모듈 조합이 가능해서 맞춤형으로 쓸 수 있는 게 장점이에요." },
  { id: "r-a10", userName: "fl*****", rating: 5, date: "2025.12.05", variant: "일반형 / 화이트", content: "예상보다 완성도가 훨씬 높아요. 재구매 의향 있습니다." },
  { id: "r-a11", userName: "gm*****", rating: 4, date: "2025.11.17", variant: "일반형 / 그레이", content: "전반적으로 만족합니다. 상단 문짝 마감이 조금 더 견고했으면 좋겠어요." },
  { id: "r-a12", userName: "hn*****", rating: 4, date: "2025.10.29", variant: "일반형 / 화이트", content: "넓은 수납공간은 좋은데 설치 시간이 생각보다 길었습니다." },
  { id: "r-a13", userName: "io*****", rating: 4, date: "2025.10.10", variant: "일반형 / 그린", content: "색감과 마감은 훌륭해요. 다만 배송 중 코너 부분에 미세한 흠집이 있었습니다." },
  { id: "r-a14", userName: "jp*****", rating: 4, date: "2025.09.22", variant: "일반형 / 화이트", content: "디자인 만족합니다. 가격 대비 충분한 퀄리티예요." },

  { id: "r-b01", userName: "kq*****", rating: 5, date: "2026.05.10", variant: "서랍형 / 그레이", content: "서랍이 부드럽게 열리고 닫혀요. 하단 서랍에 의류 수납하니 완벽합니다." },
  { id: "r-b02", userName: "lr*****", rating: 5, date: "2026.04.23", variant: "서랍형 / 화이트", content: "서랍형이 훨씬 활용도가 높아요. 물건 찾기도 편하고 정리정돈이 잘 됩니다." },
  { id: "r-b03", userName: "ms*****", rating: 5, date: "2026.04.05", variant: "서랍형 / 그린", content: "서랍 레일이 부드럽고 내구성 있어 보입니다. 만족스러운 구매였어요." },
  { id: "r-b04", userName: "nt*****", rating: 5, date: "2026.03.17", variant: "서랍형 / 그레이", content: "그레이+서랍 조합이 세련돼 보여요. 거실 분위기가 확 달라졌습니다." },
  { id: "r-b05", userName: "ou*****", rating: 5, date: "2026.02.27", variant: "서랍형 / 화이트", content: "하단 서랍이 넉넉해서 리모컨, 게임기 등 잡동사니를 모두 수납했어요." },
  { id: "r-b06", userName: "pv*****", rating: 5, date: "2026.02.08", variant: "서랍형 / 그린", content: "200cm 높이에 서랍까지 있으니 수납 걱정 없습니다. 설치도 깔끔해요." },
  { id: "r-b07", userName: "qw*****", rating: 5, date: "2026.01.20", variant: "서랍형 / 화이트", content: "선반과 서랍의 비율이 좋아요. 열린 선반에 소품 장식하기 딱 좋습니다." },
  { id: "r-b08", userName: "rx*****", rating: 5, date: "2025.12.31", variant: "서랍형 / 그레이", content: "한샘 제품답게 마감이 꼼꼼합니다. 만족스러운 구매예요." },
  { id: "r-b09", userName: "sy*****", rating: 5, date: "2025.12.12", variant: "서랍형 / 화이트", content: "처음에 일반형과 고민했는데 서랍형 선택 잘 한 것 같아요." },
  { id: "r-b10", userName: "tz*****", rating: 4, date: "2025.11.23", variant: "서랍형 / 그린", content: "서랍이 생각보다 깊어서 수납력이 좋습니다. 문짝이 조금 더 두꺼웠으면 해요." },
  { id: "r-b11", userName: "ua*****", rating: 4, date: "2025.11.04", variant: "서랍형 / 화이트", content: "전반적으로 만족해요. 하단 서랍 손잡이가 조금 더 크면 좋겠습니다." },
  { id: "r-b12", userName: "vb*****", rating: 4, date: "2025.10.16", variant: "서랍형 / 그레이", content: "디자인과 색상은 완벽해요. 배송 시 포장이 조금 아쉬웠습니다." },
  { id: "r-b13", userName: "wc*****", rating: 4, date: "2025.09.27", variant: "서랍형 / 화이트", content: "가격이 조금 있지만 퀄리티로 충분히 납득이 됩니다." },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [
  {
    id: "q-a01",
    category: "상품",
    question: "80cm와 120cm 유닛은 반드시 세트로 구매해야 하나요?",
    questioner: "hc*****",
    date: "2026.04.05",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 네, 클린트 모던 높은 거실장 200cm는 80cm 유닛과 120cm 유닛이 세트로 구성되어 있습니다. 개별 유닛 단품 구매는 현재 지원하지 않습니다. 감사합니다.",
    answerDate: "2026.04.06",
  },
  {
    id: "q-a02",
    category: "배송",
    question: "높이가 200cm인데 천장 높이 230cm인 집에서 사용 가능할까요?",
    questioner: "mp*****",
    date: "2026.03.20",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 제품 전체 높이는 200cm로, 천장 높이 230cm인 공간에서 충분히 사용 가능합니다. 설치 시 전문 배송팀이 공간 확인 후 진행하오니 안심하셔도 됩니다. 감사합니다.",
    answerDate: "2026.03.21",
  },
  {
    id: "q-a03",
    category: "상품",
    question: "일반형과 서랍형 가격 차이가 나는 이유가 무엇인가요?",
    questioner: "kw*****",
    date: "2026.02.10",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 서랍형은 하단 120cm 유닛에 서랍 모듈이 추가되어 제작 비용이 높아집니다. 수납 방식에 따라 선택하시면 됩니다. 감사합니다.",
    answerDate: "2026.02.11",
  },
  {
    id: "q-b01",
    category: "상품",
    question: "서랍형의 서랍은 몇 단인가요? 깊이도 알고 싶습니다.",
    questioner: "kq*****",
    date: "2026.04.15",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 서랍형 하단 유닛에는 3단 서랍이 포함되어 있으며, 각 서랍 깊이는 약 40cm입니다. 충분한 수납이 가능하도록 설계되었습니다. 감사합니다.",
    answerDate: "2026.04.16",
  },
  {
    id: "q-b02",
    category: "기타",
    question: "그린 컬러가 실제로 많이 튀지 않나요? 현장에서 보고 싶은데 쇼룸이 있나요?",
    questioner: "lr*****",
    date: "2026.03.08",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 그린 컬러는 채도가 낮은 세이지 계열의 그린으로 자극적이지 않고 자연스럽게 공간에 녹아듭니다. 전국 한샘 플래그십 스토어 및 주요 대리점에서 직접 확인하실 수 있습니다. 감사합니다.",
    answerDate: "2026.03.09",
  },
  {
    id: "q-b03",
    category: "상품",
    question: "하중이 약한 상단 선반이 있나요? 무거운 책을 많이 올릴 예정입니다.",
    questioner: "ms*****",
    date: "2026.02.25",
    answered: false,
  },
];
