import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  {
    id: "r-a01",
    userName: "nb*****",
    rating: 5,
    date: "2026.07.15",
    variant: "차콜 / 소",
    content: "가격이 정말 저렴한데 촉감이 좋아서 놀랐어요. 화장대 위에 두니 분위기가 한층 부드러워졌습니다.",
  },
  {
    id: "r-a02",
    userName: "ye*****",
    rating: 4,
    date: "2026.06.28",
    variant: "그레이 / 대",
    content: "폭신한 느낌은 좋은데 각티슈를 넣을 때 살짝 헐렁한 느낌이 있어요. 그래도 이 가격이면 충분히 만족스럽습니다.",
    images: ["/images/reviews/1713120040/review-02-1.webp"],
  },
  {
    id: "r-a03",
    userName: "qw*****",
    rating: 5,
    date: "2026.06.10",
    variant: "차콜 / 대",
    content: "가벼워서 방마다 옮겨 쓰기 딱 좋아요. 색감도 사진과 거의 비슷하게 왔습니다.",
    images: ["/images/reviews/1713120040/review-03-1.webp"],
  },
  {
    id: "r-a04",
    userName: "lz*****",
    rating: 5,
    date: "2026.05.22",
    variant: "그레이 / 소",
    content: "아이 방에 두었는데 부드러운 소재라 안심이 돼요. 세탁도 크게 신경 쓸 일 없어서 편합니다.",
  },
  {
    id: "r-a05",
    userName: "df*****",
    rating: 3,
    date: "2026.05.04",
    variant: "차콜 / 소",
    content: "제품은 괜찮은데 배송이 며칠 늦어져서 조금 답답했어요. 물건 자체에는 문제없이 잘 받았습니다.",
  },
  {
    id: "r-a06",
    userName: "vs*****",
    rating: 5,
    date: "2026.04.16",
    variant: "그레이 / 소",
    content: "선물용으로 여러 개 사서 나눠드렸는데 반응이 좋았어요. 부담 없는 가격이라 선물하기 편합니다.",
  },
  {
    id: "r-a07",
    userName: "kh*****",
    rating: 5,
    date: "2026.03.29",
    variant: "차콜 / 대",
    content: "심플한 디자인이라 어디에 두어도 잘 어울려요. 가격 대비 만족도가 정말 높습니다.",
  },
  {
    id: "r-a08",
    userName: "pt*****",
    rating: 4,
    date: "2026.03.11",
    variant: "그레이 / 대",
    content: "펠트 소재라 먼지가 살짝 붙는 느낌이 있어요. 그래도 가볍게 털어내면 되니 크게 불편하지는 않습니다.",
  },
  {
    id: "r-a09",
    userName: "gm*****",
    rating: 5,
    date: "2026.02.21",
    variant: "차콜 / 소",
    content: "사무실 책상에 하나 두고 쓰는데 부드러운 색감이 마음에 들어요. 이 가격에 이런 소품이면 재구매 의사 100%입니다.",
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
    question: "세탁기로 세탁이 가능한 소재인가요?",
    questioner: "ce*****",
    date: "2026.05.10",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 펠트 소재 특성상 세탁기 사용 시 변형이 생길 수 있어, 가볍게 물걸레로 닦아 사용하시는 것을 권장드립니다. 감사합니다.",
    answerDate: "2026.05.11",
  },
];
