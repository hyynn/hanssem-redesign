export type EventStatus = "진행중" | "종료";

export interface EventItem {
  id: string;
  title: string;
  description: string;
  /** "YYYY-MM-DD" */
  period: { start: string; end: string };
  image: string;
}

export interface EventWithStatus extends EventItem {
  status: EventStatus;
}

// 배너 이미지는 기존 제품 연출 컷을 재사용 — 전용 배너 에셋 확보 시 교체
export const EVENTS: EventItem[] = [
  {
    id: "ev-summer-bedding",
    title: "쿨 서머 베딩 페어",
    description: "여름밤을 바꾸는 매트리스·침구 기획전, 최대 30% 할인",
    period: { start: "2026-07-01", end: "2026-08-31" },
    image: "/images/products/bedroom/mattress/101111001/101111001-shared-01.webp",
  },
  {
    id: "ev-living-sofa",
    title: "거실의 재발견, 소파 특가전",
    description: "패브릭부터 가죽까지, 베스트 소파 라인업 한자리에",
    period: { start: "2026-07-10", end: "2026-08-09" },
    image: "/images/products/livingroom/sofa/111013001/111013001-shared-01.webp",
  },
  {
    id: "ev-first-order",
    title: "첫 구매 웰컴 혜택",
    description: "신규 회원 첫 주문 시 즉시 할인 쿠폰과 무료 배송 혜택",
    period: { start: "2026-06-01", end: "2026-12-31" },
    image: "/images/products/livingroom/cabinet/111110001/111110001-shared-01.webp",
  },
  {
    id: "ev-kids-room",
    title: "우리 아이 첫 방 꾸미기",
    description: "샘키즈 추천 구성으로 완성하는 아이방 스타일링 제안",
    period: { start: "2026-07-06", end: "2026-08-16" },
    image: "/images/products/bedroom/bed/101014001/101014001-shared-01.webp",
  },
  {
    id: "ev-dresser-plus",
    title: "수납의 기술, 드레스룸 기획전",
    description: "드레서·옷장 동시 구매 시 추가 할인",
    period: { start: "2026-05-11", end: "2026-06-30" },
    image: "/images/products/bedroom/dresser/101212001/101212001-shared-01.webp",
  },
  {
    id: "ev-spring-home",
    title: "봄맞이 홈 리프레시",
    description: "공간별 봄 시즌 베스트 아이템 큐레이션",
    period: { start: "2026-03-02", end: "2026-04-30" },
    image: "/images/products/bedroom/bed/101012001/101012001-shared-01.webp",
  },
];

export function getEventStatus(event: EventItem, now: Date): EventStatus {
  return event.period.end >= toDateString(now) ? "진행중" : "종료";
}

export function getEventsWithStatus(now: Date = new Date()): EventWithStatus[] {
  return EVENTS.map((event) => ({ ...event, status: getEventStatus(event, now) }));
}

function toDateString(date: Date): string {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}
