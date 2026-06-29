import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

// 37 reviews: 26×5 + 11×4 = 174/37 ≈ 4.7
// group a: 일반형 (20건 — 14×5 + 6×4, 포토 6장)
// group b: 다릿발형 (17건 — 12×5 + 5×4, 포토 5장)
const reviewItems: Review[] = [
  { id: "r-a01", userName: "hj*****", rating: 5, date: "2026.05.20", variant: "일반형 / 화이트", content: "거실 분위기가 확 달라졌어요. 마감이 정말 깔끔합니다.", images: ["/images/reviews/1111100010/review-a01-1.webp"] },
  { id: "r-a02", userName: "sm*****", rating: 5, date: "2026.05.08", variant: "일반형 / 머드베이지", content: "베이지 컬러가 인테리어에 잘 녹아들어요. 수납공간도 충분합니다.", images: ["/images/reviews/1111100010/review-a02-1.webp"] },
  { id: "r-a03", userName: "yk*****", rating: 5, date: "2026.04.17", variant: "일반형 / 그린", content: "그린 컬러 포인트가 예상보다 훨씬 예쁘네요. 거실 인테리어 포인트로 딱이에요.", images: ["/images/reviews/1111100010/review-a03-1.webp"] },
  { id: "r-a04", userName: "nk*****", rating: 5, date: "2026.03.29", variant: "일반형 / 화이트", content: "설치팀이 친절하고 빠르게 해주셨습니다. 제품 퀄리티도 만족스러워요.", images: ["/images/reviews/1111100010/review-a04-1.webp"] },
  { id: "r-a05", userName: "bw*****", rating: 5, date: "2026.03.10", variant: "일반형 / 머드베이지", content: "서랍 레일이 부드럽고 닫힘 소리도 조용합니다. 고급스럽네요.", images: ["/images/reviews/1111100010/review-a05-1.webp"] },
  { id: "r-a06", userName: "jy*****", rating: 5, date: "2026.02.22", variant: "일반형 / 화이트", content: "180cm 사이즈가 거실 벽에 딱 맞아요. TV 배치하니 완성도가 높습니다.", images: ["/images/reviews/1111100010/review-a06-1.webp"] },
  { id: "r-a07", userName: "kr*****", rating: 5, date: "2026.02.05", variant: "일반형 / 화이트", content: "심플하고 모던한 디자인. 오래 써도 질리지 않을 것 같아요." },
  { id: "r-a08", userName: "es*****", rating: 5, date: "2026.01.18", variant: "일반형 / 머드베이지", content: "원목 느낌의 패턴이 고급스러워요. 실물이 사진보다 더 예쁩니다." },
  { id: "r-a09", userName: "pa*****", rating: 5, date: "2025.12.30", variant: "일반형 / 그린", content: "그린 포인트로 거실이 싱그러워졌어요. 대만족입니다." },
  { id: "r-a10", userName: "wh*****", rating: 5, date: "2025.12.11", variant: "일반형 / 화이트", content: "조립 없이 바로 설치해주셔서 편했어요. 완성도 최고입니다." },
  { id: "r-a11", userName: "ch*****", rating: 5, date: "2025.11.23", variant: "일반형 / 화이트", content: "서랍 4칸이 생각보다 수납력이 좋아요. 리모컨, 충전기 등 잘 넣어둡니다." },
  { id: "r-a12", userName: "dl*****", rating: 5, date: "2025.11.05", variant: "일반형 / 머드베이지", content: "전체적인 라인이 깔끔하고 바닥과의 높이도 청소하기 좋습니다." },
  { id: "r-a13", userName: "mj*****", rating: 5, date: "2025.10.18", variant: "일반형 / 화이트", content: "한샘 제품은 역시 믿을 수 있어요. 이번에도 만족스럽습니다." },
  { id: "r-a14", userName: "st*****", rating: 5, date: "2025.09.29", variant: "일반형 / 그린", content: "그린 색상이 너무 예쁩니다. 사진으로 찍으면 더 예쁘게 나와요." },
  { id: "r-a15", userName: "ij*****", rating: 4, date: "2025.09.10", variant: "일반형 / 화이트", content: "디자인은 정말 좋은데 배송이 예상보다 하루 늦었습니다. 제품 자체는 만족해요." },
  { id: "r-a16", userName: "ow*****", rating: 4, date: "2025.08.22", variant: "일반형 / 머드베이지", content: "가격 대비 좋습니다. 도어 마감이 조금 더 두꺼웠으면 더 좋겠어요." },
  { id: "r-a17", userName: "hk*****", rating: 4, date: "2025.08.04", variant: "일반형 / 화이트", content: "전반적으로 만족합니다. 서랍 손잡이 부분이 시간이 지나면 헐거워질 것 같은 느낌이에요." },
  { id: "r-a18", userName: "yp*****", rating: 4, date: "2025.07.16", variant: "일반형 / 그린", content: "색감이 예쁘고 마감도 좋습니다. 공간이 조금 여유 있어야 더 이쁘게 보일 것 같아요." },
  { id: "r-a19", userName: "gb*****", rating: 4, date: "2025.06.28", variant: "일반형 / 화이트", content: "만족스럽습니다. 뒷판 마감이 좀 더 신경 쓰였으면 좋겠어요." },
  { id: "r-a20", userName: "tn*****", rating: 4, date: "2025.06.10", variant: "일반형 / 머드베이지", content: "다용도로 쓰기 좋은 거실장입니다. 베이지 컬러가 공간을 따뜻하게 해줘요." },

  { id: "r-b01", userName: "lm*****", rating: 5, date: "2026.05.15", variant: "다릿발형 / 화이트", content: "다릿발형 선택했는데 바닥 청소가 훨씬 편해졌어요. 룩도 더 세련돼 보입니다.", images: ["/images/reviews/1111100011/review-b01-1.webp"] },
  { id: "r-b02", userName: "rk*****", rating: 5, date: "2026.04.28", variant: "다릿발형 / 그린", content: "그린에 다릿발 조합이 북유럽 느낌 나서 너무 좋아요.", images: ["/images/reviews/1111100011/review-b02-1.webp"] },
  { id: "r-b03", userName: "se*****", rating: 5, date: "2026.04.09", variant: "다릿발형 / 머드베이지", content: "다릿발이 흔들림 없이 탄탄합니다. 설치팀도 친절하셨어요.", images: ["/images/reviews/1111100011/review-b03-1.webp"] },
  { id: "r-b04", userName: "jo*****", rating: 5, date: "2026.03.21", variant: "다릿발형 / 화이트", content: "다릿발형이 인테리어 감성에 더 잘 맞아요. 매우 만족합니다.", images: ["/images/reviews/1111100011/review-b04-1.webp"] },
  { id: "r-b05", userName: "fw*****", rating: 5, date: "2026.03.02", variant: "다릿발형 / 화이트", content: "발 높이가 있어서 좁은 거실도 더 넓어 보이는 효과가 있어요.", images: ["/images/reviews/1111100011/review-b05-1.webp"] },
  { id: "r-b06", userName: "pl*****", rating: 5, date: "2026.02.11", variant: "다릿발형 / 머드베이지", content: "다릿발 소재가 금속이라 내구성 좋아 보입니다. 오래 쓸 것 같아요." },
  { id: "r-b07", userName: "vn*****", rating: 5, date: "2026.01.25", variant: "다릿발형 / 그린", content: "색상도 디자인도 완벽해요. 거실이 카페 같아졌어요." },
  { id: "r-b08", userName: "cq*****", rating: 5, date: "2026.01.07", variant: "다릿발형 / 화이트", content: "화이트에 다릿발이 깔끔하고 고급스럽습니다." },
  { id: "r-b09", userName: "xt*****", rating: 5, date: "2025.12.19", variant: "다릿발형 / 화이트", content: "배송부터 설치까지 완벽했어요. 제품 마감도 훌륭합니다." },
  { id: "r-b10", userName: "ql*****", rating: 5, date: "2025.11.30", variant: "다릿발형 / 머드베이지", content: "서랍 개폐가 부드럽고 소음이 거의 없어요. 만족합니다." },
  { id: "r-b11", userName: "zi*****", rating: 5, date: "2025.11.12", variant: "다릿발형 / 그린", content: "어느 방향에서 봐도 예쁜 디자인이에요. 정말 잘 샀습니다." },
  { id: "r-b12", userName: "at*****", rating: 5, date: "2025.10.24", variant: "다릿발형 / 화이트", content: "한샘 특유의 깔끔한 마감. 역시 믿고 삽니다." },
  { id: "r-b13", userName: "bu*****", rating: 4, date: "2025.10.05", variant: "다릿발형 / 머드베이지", content: "예쁜데 다릿발 높이가 생각보다 낮아서 로봇청소기가 못 들어가요." },
  { id: "r-b14", userName: "cx*****", rating: 4, date: "2025.09.17", variant: "다릿발형 / 화이트", content: "디자인은 완벽합니다. 설치 시간이 조금 오래 걸렸어요." },
  { id: "r-b15", userName: "dy*****", rating: 4, date: "2025.08.29", variant: "다릿발형 / 그린", content: "전반적으로 만족합니다. 서랍 손잡이 없는 게 처음엔 불편했는데 익숙해졌어요." },
  { id: "r-b16", userName: "ez*****", rating: 4, date: "2025.08.10", variant: "다릿발형 / 화이트", content: "깔끔하고 좋습니다. 뒷면 정리가 살짝 신경 쓰이네요." },
  { id: "r-b17", userName: "fa*****", rating: 4, date: "2025.07.22", variant: "다릿발형 / 머드베이지", content: "가격이 조금 높지만 품질로 납득이 돼요. 만족합니다." },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [
  {
    id: "q-a01",
    category: "상품",
    question: "화이트 색상 시간이 지나면 황변이 생기나요?",
    questioner: "hj*****",
    date: "2026.04.10",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 클린트 어반 거실장의 화이트 마감은 UV 코팅 처리가 되어 있어 일반적인 사용 환경에서는 황변이 거의 발생하지 않습니다. 다만 직사광선이 장시간 닿는 환경은 피해주시길 권장드립니다. 감사합니다.",
    answerDate: "2026.04.11",
  },
  {
    id: "q-a02",
    category: "배송",
    question: "설치 시 TV 배선 정리도 도와주시나요?",
    questioner: "sm*****",
    date: "2026.03.15",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 배선 정리는 별도 서비스 범위에 포함되지 않으며, 가구 설치 완료 후 고객님께서 직접 정리하셔야 합니다. 거실장 후면에 배선 구멍이 있어 정리에 도움이 됩니다. 감사합니다.",
    answerDate: "2026.03.16",
  },
  {
    id: "q-a03",
    category: "상품",
    question: "상판에 수납장을 얹어도 되나요? 무게 한도가 궁금합니다.",
    questioner: "yk*****",
    date: "2026.02.01",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 상판 권장 하중은 30kg 이내입니다. 무거운 물건을 장기간 올려두실 경우 상판 변형이 발생할 수 있으니 유의 부탁드립니다. 감사합니다.",
    answerDate: "2026.02.02",
  },
  {
    id: "q-b01",
    category: "상품",
    question: "다릿발 높이가 정확히 몇 cm인지 알 수 있을까요?",
    questioner: "lm*****",
    date: "2026.04.22",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 클린트 어반 다릿발형의 다릿발 높이는 약 12cm입니다. 로봇청소기 진입 여부는 기기 높이에 따라 다를 수 있으니 사전 확인 부탁드립니다. 감사합니다.",
    answerDate: "2026.04.23",
  },
  {
    id: "q-b02",
    category: "기타",
    question: "일반형과 다릿발형 중 어떤 게 더 인기 있나요?",
    questioner: "rk*****",
    date: "2026.03.05",
    answered: false,
  },
];
