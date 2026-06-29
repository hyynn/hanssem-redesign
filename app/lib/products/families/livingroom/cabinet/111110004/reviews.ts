import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

// 16 reviews: 13×5 + 3×4 = 77/16 ≈ 4.8
// group a: 단일 (포토리뷰 3장)
const reviewItems: Review[] = [
  { id: "r-a01", userName: "gb*****", rating: 5, date: "2026.05.16", variant: "화이트", content: "AV장 디자인이 너무 세련됐어요. 화이트 컬러가 공간을 밝게 해줍니다.", images: ["/images/reviews/1111100040/review-a01-1.webp"] },
  { id: "r-a02", userName: "tc*****", rating: 5, date: "2026.04.30", variant: "오트밀", content: "오트밀 색상이 따뜻한 거실 분위기와 잘 어울려요. 케이블 정리 공간도 있어 좋습니다.", images: ["/images/reviews/1111100040/review-a02-1.webp"] },
  { id: "r-a03", userName: "wd*****", rating: 5, date: "2026.04.13", variant: "화이트", content: "2000cm 길이가 TV 아래 딱 맞습니다. AV 기기 수납공간도 충분해요.", images: ["/images/reviews/1111100040/review-a03-1.webp"] },
  { id: "r-a04", userName: "xe*****", rating: 5, date: "2026.03.27", variant: "화이트", content: "마감이 너무 고급스러워요. 할인 안 해도 살 것 같습니다." },
  { id: "r-a05", userName: "yf*****", rating: 5, date: "2026.03.10", variant: "오트밀", content: "밀란 시리즈 특유의 매끄러운 디자인. 선 하나 없이 깔끔합니다." },
  { id: "r-a06", userName: "zg*****", rating: 5, date: "2026.02.21", variant: "화이트", content: "305 블랑 라인과 같이 구매했는데 통일감이 좋아요. 거실이 갤러리 같아졌습니다." },
  { id: "r-a07", userName: "ah*****", rating: 5, date: "2026.02.04", variant: "오트밀", content: "AV 기기 위주로 정리하기 좋게 설계된 제품이에요. 배선 처리도 깔끔합니다." },
  { id: "r-a08", userName: "bi*****", rating: 5, date: "2026.01.18", variant: "화이트", content: "낮고 넓은 형태가 거실을 더 넓어 보이게 해줘요." },
  { id: "r-a09", userName: "cj*****", rating: 5, date: "2025.12.31", variant: "오트밀", content: "오트밀 색감이 고급스럽고 차분해요. 장기간 써도 질리지 않을 것 같습니다." },
  { id: "r-a10", userName: "dk*****", rating: 5, date: "2025.12.14", variant: "화이트", content: "화이트 마감이 깨끗하고 광택이 딱 적당합니다. 흠집 방지도 잘 되어있어요." },
  { id: "r-a11", userName: "el*****", rating: 5, date: "2025.11.27", variant: "오트밀", content: "설치팀이 꼼꼼하게 해주셨고 완성도 최고입니다." },
  { id: "r-a12", userName: "fm*****", rating: 5, date: "2025.11.10", variant: "화이트", content: "2미터 거실장인데도 가벼운 느낌. 디자인이 정말 탁월합니다." },
  { id: "r-a13", userName: "gn*****", rating: 5, date: "2025.10.23", variant: "오트밀", content: "한샘 밀란 시리즈 모아가는 중입니다. 전부 만족도 최상이에요." },
  { id: "r-a14", userName: "ho*****", rating: 4, date: "2025.10.06", variant: "화이트", content: "디자인 완벽합니다. 내부 수납 구획이 조금 더 세분화되었으면 좋겠어요." },
  { id: "r-a15", userName: "ip*****", rating: 4, date: "2025.09.19", variant: "오트밀", content: "만족스럽습니다. 가격이 있는 편이지만 디자인에서 납득이 돼요." },
  { id: "r-a16", userName: "jq*****", rating: 4, date: "2025.09.02", variant: "화이트", content: "전반적으로 좋습니다. 배송 예약이 생각보다 오래 걸렸어요." },
];

export const sharedReviews: ReviewData = {
  ...calculateReviewSummary(reviewItems),
  items: reviewItems,
};

export const sharedQnaItems: QnaItem[] = [
  {
    id: "q-a01",
    category: "상품",
    question: "밀란 305 블랑 소파테이블이나 사이드테이블과 컬러가 동일한가요?",
    questioner: "gb*****",
    date: "2026.04.18",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 밀란 304 블랑 AV장은 밀란 시리즈와 동일한 컬러 코드를 사용하여 시리즈 내 제품들과 함께 사용하실 경우 통일감을 유지할 수 있도록 설계되어 있습니다. 단, 생산 배치에 따라 미세한 색감 차이가 있을 수 있습니다. 감사합니다.",
    answerDate: "2026.04.19",
  },
  {
    id: "q-a02",
    category: "상품",
    question: "AV 기기 발열 문제로 도어를 열어둔 채로 사용해도 되나요?",
    questioner: "tc*****",
    date: "2026.03.22",
    answered: false,
  },
];
