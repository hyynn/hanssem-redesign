import { NextRequest } from "next/server";
import { catalog } from "@/app/lib/catalog";
import { searchProducts, searchKeywords } from "@/lib/search";
import type { SearchResponse, ApiError } from "@/app/lib/api-types";

// GET /api/products/search?q=검색어
// 다중 키워드 AND 매칭·상품명 우선순위 로직은 lib/search.ts의 순수 함수를 그대로 호출 —
// 이 route를 거치면 catalog 전체가 클라이언트 번들에 실리지 않고 서버에서만 스캔된다.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  // 빈 검색어는 "결과 0건"이 아니라 잘못된 요청 — 클라이언트가 헛 fetch를 보낸 것이므로 400
  if (!q) {
    return Response.json(
      { error: "검색어(q)를 입력해 주세요." } satisfies ApiError,
      { status: 400 },
    );
  }

  const body: SearchResponse = {
    query: q,
    products: searchProducts(q, catalog),
    keywords: searchKeywords(q, catalog),
  };
  return Response.json(body);
}
