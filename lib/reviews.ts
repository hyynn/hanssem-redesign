export function calculateReviewSummary(items: { rating: number }[]): {
  count: number;
  distribution: { stars: number; count: number }[];
  rating: number;
} {
  const count = items.length;
  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: items.filter((r) => r.rating === stars).length,
  }));
  const rating =
    count === 0
      ? 0
      : Math.round((items.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10;
  return { count, distribution, rating };
}
