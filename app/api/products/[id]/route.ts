import { getProductDetail } from "@/app/lib/products";
import type { ApiError } from "@/app/lib/api-types";
import type { ProductDetail } from "@/app/lib/types";

// GET /api/products/:id — 상세 단건 조회.
// 존재하지 않는 id는 예외를 던지는 대신 404 + 에러 바디로 응답해
// 클라이언트가 "없는 상품" 케이스를 상태 코드만으로 분기할 수 있게 함.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const detail: ProductDetail | null = getProductDetail(id);

  if (!detail) {
    // id를 메시지에 반사하지 않음 — 사용자 입력이 응답에 echo되는 것을 피하고,
    // 디버깅에 필요한 id는 요청 URL에 이미 남아 있음
    return Response.json(
      { error: "해당 상품을 찾을 수 없습니다." } satisfies ApiError,
      { status: 404 },
    );
  }
  return Response.json(detail);
}
