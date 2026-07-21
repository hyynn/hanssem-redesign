export function formatPrice(value: number): string {
  return value.toLocaleString("ko-KR");
}

// 항상 내림 — 반올림 시 실제보다 큰 할인율이 표시될 수 있어(예: 19.6% → 20%) 과장 표시 방지
export function calcDiscountRate(price: number, originalPrice: number): number {
  if (originalPrice <= 0 || price >= originalPrice) return 0;
  return Math.floor((1 - price / originalPrice) * 100);
}
