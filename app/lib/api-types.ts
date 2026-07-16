import type { ProductSummary } from "./types";

// API 응답 계약 — route handler(서버)와 fetch(클라이언트)가 같은 타입을 공유해
// 응답 구조가 어긋나는 것을 컴파일 타임에 잡기 위한 파일.
// 상품 필드명은 ProductSummary/ProductDetail을 그대로 재사용한다 (별도 DTO 변환 없음).

// GET /api/products — 목록 조회 (category / limit / page / pageSize 쿼리)
export interface ProductListResponse {
  products: ProductSummary[];
  total: number;     // 필터 적용 후 전체 개수 (페이지네이션 UI 계산용)
  page: number;
  pageSize: number;
}

// GET /api/products/search?q= — 상품 + 연관 분류명 키워드를 한 응답에 담아
// 드롭다운이 fetch 1회로 두 레이어를 모두 그릴 수 있게 함
export interface SearchResponse {
  query: string;
  products: ProductSummary[];
  keywords: string[];
}

// 모든 엔드포인트 공통 에러 형태 (4xx/5xx 응답 바디)
export interface ApiError {
  error: string;
}
