import type { ReviewData, QnaItem, Review } from "@/app/lib/types";
import { calculateReviewSummary } from "@/lib/reviews";

const reviewItems: Review[] = [
  // ── 좌식 소파베드 아이보리 ──
  {
    id: "r-a01",
    userName: "yk*****",
    rating: 5,
    date: "2026.06.15",
    variant: "아이보리",
    content: "원룸에 쓰기 딱 좋은 사이즈예요. 접으면 좌식 소파, 펼치면 싱글 침대 수준의 넓이가 나와서 손님이 올 때도 요긴하게 쓰고 있어요. 아이보리 색이 밝은 원룸 분위기와 잘 맞아서 만족합니다.",
    images: ["/images/reviews/1110130010/review-01-1.webp"],
  },
  {
    id: "r-a02",
    userName: "cn*****",
    rating: 5,
    date: "2026.06.08",
    variant: "아이보리",
    content: "자취방 공간 활용을 위해 구매했어요. 소파로 쓰다가 자기 전에 펼쳐서 침대로 쓰니까 공간이 정말 알뜰하게 활용됩니다. 두께감도 적당해서 앉거나 누워도 편해요.",
    images: ["/images/reviews/1110130010/review-02-1.webp"],
  },
  {
    id: "r-a03",
    userName: "hm*****",
    rating: 5,
    date: "2026.06.01",
    variant: "아이보리",
    content: "좌식이라 바닥 생활하는 저한테 딱 맞아요. 등받이를 세우면 소파로, 뉘이면 편안한 베드가 되는 전환이 굉장히 쉽습니다. 직접 조립도 어렵지 않고요. 가격 대비 퀄리티 너무 좋아요.",
  },
  {
    id: "r-a04",
    userName: "ar*****",
    rating: 5,
    date: "2026.05.25",
    variant: "아이보리",
    content: "게임하거나 영상 볼 때 바닥에 앉기 편하도록 등받이 각도를 조절할 수 있어서 좋아요. 쿠션도 얇지 않고 적당한 두께라 오래 앉아도 엉덩이가 아프지 않습니다.",
    images: ["/images/reviews/1110130010/review-04-1.webp", "/images/reviews/1110130010/review-04-2.webp", "/images/reviews/1110130010/review-04-3.webp"],
  },
  {
    id: "r-a05",
    userName: "wo*****",
    rating: 5,
    date: "2026.05.18",
    variant: "아이보리",
    content: "아이보리 색상이 깔끔하고 세련되어 보여요. 좌식 생활을 하는 집에 잘 어울리는 소파베드입니다. 패브릭 소재가 부드럽고 먼지가 잘 안 쌓여서 관리도 편해요.",
  },
  {
    id: "r-a06",
    userName: "jl*****",
    rating: 4,
    date: "2026.05.11",
    variant: "아이보리",
    content: "전반적으로 만족스럽지만 소파베드로 펼쳤을 때 이음새 부분이 약간 불편할 수 있어요. 단기 취침용으로는 충분하지만 매일 밤 침대로 쓰기엔 조금 아쉬울 수 있어요. 좌식 소파 용도로는 완벽합니다.",
    images: ["/images/reviews/1110130010/review-06-1.webp"],

  },
  {
    id: "r-a07",
    userName: "xb*****",
    rating: 4,
    date: "2026.05.04",
    variant: "아이보리",
    content: "가성비 좋은 소파베드예요. 원룸에서 소파와 침대를 동시에 해결할 수 있다는 게 정말 좋아요. 다만 아이보리 색상이라 오염에 조금 예민하게 신경 써야 할 것 같아요. 관리에 주의해야 해요.",
  },
  {
    id: "r-a08",
    userName: "tz*****",
    rating: 5,
    date: "2026.04.27",
    variant: "아이보리",
    content: "배송이 빠르고 조립도 간단해서 좋았어요. 설명서가 명확해서 혼자서도 20분 만에 완성했습니다. 바닥 생활하는 저한테 딱 맞는 소파베드이고 가격도 합리적이에요.",
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
    question: "소파베드로 펼쳤을 때 사이즈가 어느 정도 되나요? 성인 1명이 자기에 충분한가요?",
    questioner: "mc*****",
    date: "2026.06.05",
    answered: true,
    answer: "안녕하세요, 한샘입니다. 휴 모드 좌식 소파베드 펼침 시 약 가로 70cm × 세로 180cm 크기가 됩니다. 성인 1명이 취침하기에 충분한 사이즈입니다. 정확한 사이즈는 상품 상세페이지 사이즈 탭에서 확인하실 수 있습니다.",
    answerDate: "2026.06.06",
  },
];
