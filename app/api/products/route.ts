import { NextRequest } from "next/server";
import { catalog, getByCategory } from "@/app/lib/catalog";
import type { ProductListResponse, ApiError } from "@/app/lib/api-types";

// GET /api/products?category=침대&page=1&pageSize=8
// 데이터 소스는 기존 catalog 모듈을 그대로 재사용 — API는 "HTTP로 여는 창구"만 담당하고
// 필터/정렬 로직은 한 곳(catalog.ts)에 유지해 서버 컴포넌트와 응답이 어긋나지 않게 함.
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "20");

  // 잘못된 숫자 파라미터는 조용히 기본값으로 보정하지 않고 400으로 알려
  // 클라이언트 쪽 버그를 조기에 드러낸다
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1) {
    return Response.json(
      { error: "page와 pageSize는 1 이상의 정수여야 합니다." } satisfies ApiError,
      { status: 400 },
    );
  }

  // category 미지정 시 전체 목록을 판매량순으로 — 베스트셀러 조회와 동일한 기준
  const filtered = category
    ? getByCategory(category)
    : [...catalog].sort((a, b) => b.salesCount - a.salesCount);

  const start = (page - 1) * pageSize;
  const body: ProductListResponse = {
    products: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
  return Response.json(body);
}
