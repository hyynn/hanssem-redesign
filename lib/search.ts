import type { ProductSummary } from "@/app/lib/types";
import { CATEGORY_TREE } from "@/lib/category-codes";

/* 상품 검색 유틸 — 특정 상품/카테고리 이름을 알지 못하는 순수 매칭 로직.
   ProductSummary의 name·category[]·categoryTags[]만 스캔하므로
   새 패밀리·카테고리가 추가되어도 별도 등록 없이 검색에 자동 반영됨 */

function normalize(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "");
}

/** 상품 1건의 검색 대상 문자열 (이름 + 카테고리 경로 + 추가 소분류 태그) */
function haystackOf(p: ProductSummary): string {
  return normalize([p.name, ...p.category, ...(p.categoryTags ?? [])].join(""));
}

/**
 * 공백으로 구분된 다중 키워드 AND 매칭.
 * 상품명에 직접 매칭된 결과를 카테고리 매칭보다 앞에 배치하고,
 * 같은 그룹 안에서는 판매량순으로 정렬한다.
 */
export function searchProducts(
  query: string,
  products: ProductSummary[],
): ProductSummary[] {
  const tokens = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (tokens.length === 0) return [];

  const matched = products.filter((p) => {
    const haystack = haystackOf(p);
    return tokens.every((t) => haystack.includes(t));
  });

  const nameHit = (p: ProductSummary) =>
    tokens.some((t) => normalize(p.name).includes(t));

  return matched.sort((a, b) => {
    const byName = Number(nameHit(b)) - Number(nameHit(a));
    if (byName !== 0) return byName;
    return b.salesCount - a.salesCount;
  });
}

/** CATEGORY_TREE의 대/중/소분류명 전체 (트리 갱신 시 자동 반영) */
function categoryNamesFromTree(): string[] {
  const names: string[] = [];
  for (const major of Object.values(CATEGORY_TREE)) {
    names.push(major.name);
    for (const mid of Object.values(major.sub)) {
      names.push(mid.name);
      names.push(...(Object.values(mid.sub) as string[]));
    }
  }
  return names;
}

/**
 * 연관 분류명 검색 (드롭다운 키워드 레이어용).
 * 후보 = CATEGORY_TREE의 전체 분류명 + 상품들의 categoryTags —
 * 카테고리·상품이 늘어나면 후보도 자동으로 늘어남.
 * 검색어로 시작하는 분류명을 앞에, 나머지는 짧은 이름 순으로 정렬.
 */
export function searchKeywords(
  query: string,
  products: ProductSummary[],
): string[] {
  const tokens = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  if (tokens.length === 0) return [];

  const candidates = new Set<string>(categoryNamesFromTree());
  for (const p of products) {
    for (const tag of p.categoryTags ?? []) candidates.add(tag);
  }

  // 상품이 하나도 걸리지 않는 분류명은 빈 결과 dead end이므로 제외
  const haystacks = products.map(haystackOf);
  const matched = [...candidates].filter((name) => {
    const n = normalize(name);
    return (
      tokens.every((t) => n.includes(t)) &&
      haystacks.some((h) => h.includes(n))
    );
  });

  const startsWith = (name: string) => normalize(name).startsWith(tokens[0]);

  return matched.sort((a, b) => {
    const byPrefix = Number(startsWith(b)) - Number(startsWith(a));
    if (byPrefix !== 0) return byPrefix;
    return a.length - b.length;
  });
}
