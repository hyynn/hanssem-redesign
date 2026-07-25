# 상품 데이터 & API 가이드

상품군(패밀리) 추가·삭제, 상품 데이터 수정 시 어느 파일의 어느 부분을 고쳐야 하는지,
그리고 그 데이터를 노출하는 API의 구조를 정리한 문서.

## 데이터 흐름 한눈에 보기

```
app/lib/products/families/{대분류}/{중분류}/{FAMILY_CODE}/   ← 원본 데이터 (패밀리당 3파일)
        │  index.ts    familyObj · variantDetails · summaries[] · getDetail()
        │  sections.ts 상세페이지 섹션(기본 5종, 카테고리별 추가/변경 가능) + 배송 안내(deliveryGuides) + 고지(notices)
        │  reviews.ts  리뷰·문의
        ▼
app/lib/products/families/index.ts   FAMILY_REGISTRY (코드↔경로 매핑)
app/lib/products/index.ts            getDetail 레지스트리 (상세 페이지용)
app/lib/catalog.ts                   catalog[] (모든 summaries 집합 — 목록·검색·추천의 단일 소스)
        ▼
서버 컴포넌트(홈·카테고리·상세) → catalog/getDetail 직접 호출
API Routes(app/api/products/…)  → 같은 모듈을 HTTP로 감쌈
클라이언트(헤더 자동완성·검색 결과·모달 추천) → API fetch
```

핵심: **catalog에 들어가면 목록·검색·필터·추천·API 전부 자동 반영**된다.
API route(`app/api/products/`)는 catalog를 호출만 하므로 상품을 늘리고 줄일 때 수정할 일이 없다.

---

## 1. 상품군(패밀리) 추가

수정 지점은 정확히 **4곳**. 하나라도 빠지면 상세 페이지가 404가 된다.

### ① 패밀리 폴더 생성 — `app/lib/products/families/{대분류slug}/{중분류slug}/{FAMILY_CODE}/`

- `FAMILY_CODE`는 상품코드 앞 9자리 (예: `101012001`). 한 번 부여하면 재배치 금지, 항상 다음 빈 번호를 이어붙임.
- 3개 파일을 작성한다. 기존 패밀리(예: `bedroom/bed/101012001/`)를 복사해 시작하는 것이 가장 안전.

**index.ts** — 내부 선언 순서 고정:
1. `familyObj` (sharedImages·deliveryGuides·notices 포함)
2. `VariantData` 타입
3. `variantDetails` — SKU별 variantImages / filterAttributes / sections
4. `thumbnailFor` / `hoverImageFor` 헬퍼 (경로 하드코딩 금지 — 반드시 헬퍼로 파생)
5. `summaries[]` — 카드·목록·검색에 쓰이는 데이터. **filterAttributes는 variantDetails와 별개로 여기에도 직접** 넣어야 카테고리 필터에 노출됨
6. `getDetail()` — 마지막

`familyObj.breadcrumb: string[]`는 상세페이지에서 클릭 가능한 카테고리 링크로 렌더링되므로
`lib/category-codes.ts`의 CATEGORY_TREE가 아니라 **`app/components/category/categoryConfig.ts`의
CATEGORY_CONFIG 실제 값**(mainCategory / 탭 label / subcategory categoryName)을 그대로 옮겨 적을 것.
자세한 매칭 규칙은 CLAUDE.md의 "브레드크럼 카테고리 매칭 규칙" 참조.

용량·세트 추가처럼 콘텐츠는 같고 가격만 달라지는 옵션은 SKU를 늘리지 말고 `summaries[]`의 `priceOptionGroups`로 표현 (주방수납류처럼 옵션 조합이 많은 카테고리에 특히 유용):

```ts
priceOptionGroups: [
  {
    id: "capacity",
    label: "용량 선택",
    options: [
      { id: "s", label: "실속형 (15L)", priceDelta: 0 },      // options[0] = 기본값, 항상 priceDelta 0
      { id: "l", label: "라지 (35L)", priceDelta: 15000 },
    ],
  },
],
```


**sections.ts** — `FAMILY_PATH`("{대분류slug}/{중분류slug}/{FAMILY_CODE}"), `FAMILY_CODE`, `deliveryGuides`, `notices`, `createSections()`. 새 패밀리는 `basic → function → material → size → warranty` 5종을 기본 틀로 시작하되, 이 5개가 고정은 아니다 — 카테고리 고유 섹션은 id를 자유롭게 추가할 수 있고(탭은 `sections` 배열을 그대로 렌더링하므로 별도 등록 불필요), `warranty` 자리가 `notice`(주의사항) 등으로 대체되거나 순서가 바뀔 수도 있다.

배송 안내와 고지 정보는 `app/lib/products/detail-presets.ts`의 프리셋 기반으로 작성한다 (리터럴 직접 작성 금지):

```ts
import { INSTALL_DELIVERY, withDeliveryOverrides, createNotices } from "@/app/lib/products/detail-presets";

// 배송 유형 프리셋을 고르고, 상품 고유 사정만 덮어쓴다.
// PARCEL_DELIVERY(택배 소품) / INSTALL_DELIVERY(직배송+설치 가구) /
// DIRECT_DELIVERY(직배송 매트리스류) / CUSTOM_INSTALL_DELIVERY(맞춤 시공)
export const deliveryGuides = withDeliveryOverrides(INSTALL_DELIVERY, {
  "배송 안내": { rows: { "배송기간": "주문 후 3~4주 내 순차 배송 (사전판매 상품)" } },
  "설치 서비스 안내": { rows: { "설치 소요시간": "약 60~90분" } },
});
// 프리셋 그대로면 override 없이: export const deliveryGuides = PARCEL_DELIVERY;
// override 문법: 값 null = 행 제거, 그룹에 null = 그룹 제거, replaceRows = 행 전체 교체

// 구매전 필수 확인사항 / 상품 고시정보 / 교환·반품 — 상세 페이지 PrePurchaseNotice에 노출
export const notices = createNotices(
  "install", // "parcel" | "install" | "direct" | "customInstall" — 배송 유형과 맞출 것
  "품명: 침대 프레임 / 소재: LPM(E0 등급 친환경 보드), 스틸 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)",
  // 확인사항·교환/반품은 유형별 기본 문구가 채워짐. 맞춤제작 등 특수한 상품만
  // { preCheck: "...", returns: "..." } 세 번째 인자로 override
);
```

`notices`는 index.ts의 familyObj를 거쳐 상세 페이지로 전달되므로 **export 누락 시 타입 에러**가 난다.

**reviews.ts** — `sharedReviews`(calculateReviewSummary로 자동 계산, 평점 하드코딩 금지) + `sharedQnaItems`. 형식 규칙은 CLAUDE.md의 "reviews.ts 파일 패턴" 참조.

### ② `app/lib/products/families/index.ts`

`FAMILY_REGISTRY`에 import 1줄 + 항목 1줄 추가.

### ③ `app/lib/products/index.ts`

summaries import + getDetail import + registry의 `Object.fromEntries` 목록에 1줄 추가.

### ④ `app/lib/catalog.ts`

summaries import 1줄 + `catalog` 배열에 spread 1줄 추가.

### 이미지

`public/images/products/{대분류slug}/{중분류slug}/{FAMILY_CODE}/`
- 공유 파일: `{FAMILY_CODE}-shared-01.webp`, `{FAMILY_CODE}-basic-01.mp4` 등
- SKU별: 10자리 코드 서브폴더 안에 `{상품코드}-main-01.webp` 형식
- 정적 이미지는 `.webp`, 움직임이 필요한 구간은 `.mp4`

### 확인 방법

`npm run dev` 후 ① 카테고리 페이지에 카드가 뜨는지 ② 카드 클릭 → 상세 페이지가 열리는지(404면 위 4곳 중 누락) ③ 헤더 검색에 상품명이 잡히는지 ④ `/api/products?category=…`에 포함되는지.

---

## 2. 상품군(패밀리) 삭제

추가의 역순, 같은 4곳:

1. `app/lib/catalog.ts` — import 1줄 + spread 1줄 제거
2. `app/lib/products/index.ts` — import 2줄 + registry 1줄 제거
3. `app/lib/products/families/index.ts` — FAMILY_REGISTRY의 import·항목 제거
4. 패밀리 폴더와 `public/images/products/...` 이미지 폴더 삭제

주의:
- **상품코드는 회수·재사용하지 않는다.** 삭제된 번호는 영구 결번 (코드 불변 원칙).
- 삭제 전 검색: 다른 패밀리의 추천·큐레이션(예: 홈 SpaceCurationHotspot, 카테고리 config)에서 해당 상품 id를 참조하고 있으면 함께 정리해야 함. `grep -r "{상품코드}" app lib`로 확인.
- 장바구니(zustand)는 상품 id 스냅샷을 저장하므로 삭제해도 빌드는 깨지지 않지만, 저장된 장바구니의 옛 상품 링크는 404가 된다.

---

## 3. SKU 추가/삭제 (기존 패밀리 내부)

해당 패밀리의 **index.ts 한 파일**에서:

- `variantDetails`에 SKU 항목 추가/제거
- `summaries[]`에 카드 항목 추가/제거 (thumbnail은 `thumbnailFor()`, hoverImage는 `hoverImageFor()`로만)
- SKU 구성 원칙: **사진·상세 콘텐츠가 같으면 SKU를 늘리지 않는다.** 색상만 다르면 `colors: ColorOption[]`(한글 색상명, 원재료 차이로 가격이 다르면 `{ name, priceDelta }` 객체)에 추가하고, 용량·세트 추가처럼 색상 외 축에서 가격만 달라지면 `priceOptionGroups`로 표현한다. 사진·설명까지 달라질 때만 별도 SKU.
- 옵션 번호(코드 마지막 1자리)는 패밀리 전체를 가격 오름차순으로 0부터 부여. 단, 이미 부여된 코드는 바꾸지 않고 새 SKU만 다음 번호를 받는다.
- 리뷰를 SKU별 그룹으로 관리 중이면 `reviews.ts`에 `// ── {variant 라벨} ──` 그룹 추가 (id는 `r-{그룹문자}NN`).

catalog.ts 등록은 패밀리 단위라 SKU 변경 시 건드릴 필요 없음.

---

## 4. 상품 데이터 변경

전부 해당 패밀리 폴더 안에서 해결된다. 항목별 위치:

| 바꾸고 싶은 것 | 파일 | 위치 |
|---|---|---|
| 상품명·가격·판매량·배지 | index.ts | `summaries[]`의 해당 SKU 항목 |
| 할인율 | — | 직접 입력하지 않음 — `price`/`originalPrice`에서 `lib/format.ts`의 `calcDiscountRate()`로 항상 자동 계산(내림) |
| 색상 옵션 | index.ts | `summaries[]`의 `colors[]` (한글 색상명, hex 금지 — 렌더링은 `colorName()`으로 이름을 뽑은 뒤 `lib/filter-dimensions.ts`의 `COLOR_HEX` 맵. 원재료 차이로 가격이 다르면 `{ name, priceDelta }` 객체로) |
| 유상 옵션(용량·세트 추가 등) | index.ts | `summaries[]`의 `priceOptionGroups[]` (`app/lib/types.ts`의 `PriceOptionGroup`/`PriceOption`). `options[0]`은 항상 기본값(`priceDelta: 0`) |
| 썸네일/hover 이미지 | index.ts | `variantDetails[].variantImages` 순서 변경 또는 파일 교체 (`thumbnailFor`가 `variantImages[0]`, 없으면 `sharedImages[0]` 폴백) |
| 갤러리 이미지 | index.ts | `familyObj.sharedImages`(공유) / `variantDetails[].variantImages`(SKU 전용) |
| 카테고리 소속(primary) | index.ts | `summaries[]`의 `category[]` — 마지막 항목이 primary 소분류 (스타일/타입 축 우선) |
| 추가 소분류·칩 노출 | index.ts | `summaries[]`의 `categoryTags[]` — **카테고리 config의 `categoryName`과 글자까지 정확히 일치**해야 칩에서 보임 |
| 필터(사이즈·구성·기능) | index.ts | `filterAttributes` — **summaries와 variantDetails 양쪽 모두** 같은 값으로 (summaries에 없으면 필터 미노출) |
| 상세 본문(소개·기능·소재·사이즈) | sections.ts | `createSections()`의 해당 섹션 blocks |
| 배송 안내 | sections.ts | `deliveryGuides` — 프리셋 공통 문구는 detail-presets.ts에서 일괄 수정, 상품 고유 값은 `withDeliveryOverrides` 인자 |
| 구매전 확인사항·고시정보·교환/반품 | sections.ts | `notices` — 고시정보는 `createNotices` 두 번째 인자, 유형 공통 문구는 detail-presets.ts |
| 리뷰·문의 | reviews.ts | `reviewItems[]` / `sharedQnaItems[]` — 평점·건수는 자동 계산되므로 items만 수정 |

평점·리뷰수(`summaries`의 `rating`/`reviewCount`)는 카드 표시용 수기 값이므로, 리뷰를 크게 바꿨다면 상세 페이지의 자동 계산 값과 어긋나지 않게 함께 갱신할 것.

---

## 5. API 구조

### 설계 원칙 — 하이브리드 소비

서버 컴포넌트가 자기 서버의 API를 fetch로 다시 부르는 것은 불필요한 HTTP 왕복이므로,
**서버 컴포넌트는 데이터 모듈을 직접 호출하고, 비동기성이 실제로 필요한 클라이언트 영역만 API를 fetch**한다.
두 경로 모두 같은 모듈(catalog.ts, lib/search.ts)을 쓰기 때문에 결과가 어긋날 수 없다.

| 소비처 | 방식 |
|---|---|
| 홈·카테고리·상세 페이지 (서버 컴포넌트) | `catalog.ts` / `getProductDetail` 직접 호출 |
| 헤더 검색 자동완성 (클라이언트) | `GET /api/products/search` — 300ms 디바운스 + AbortController |
| 검색 결과 페이지 `SearchResults` (클라이언트) | `GET /api/products/search` — 로딩/에러/빈 결과 상태 구분 |
| 장바구니 모달 추천 (클라이언트) | `GET /api/products?category=…` — 페이지 진입 시 프리페치 + 모듈 캐시 |

### 엔드포인트

파일 위치는 `app/api/products/` 아래. 모두 GET 전용이며, 로직은 갖지 않고 기존 모듈을 호출만 한다.

**`GET /api/products`** — [app/api/products/route.ts](../app/api/products/route.ts)
- 쿼리: `category`(선택 — `getByCategory` 재사용, category[]+categoryTags 매칭·판매량순), `page`(기본 1), `pageSize`(기본 20)
- category 미지정 시 전체 목록을 판매량순으로 반환
- 응답: `ProductListResponse` = `{ products, total, page, pageSize }` (total은 필터 후 전체 건수 — 페이지네이션 UI 계산용)
- 에러: page/pageSize가 1 이상의 정수가 아니면 400

**`GET /api/products/[id]`** — [app/api/products/[id]/route.ts](../app/api/products/[id]/route.ts)
- 10자리 상품코드로 상세 조회, `getProductDetail` 재사용
- 응답: `ProductDetail` 그대로 (siblings·sections·reviews 포함)
- 에러: 없는 id면 404. 메시지에 id를 반사하지 않음(사용자 입력 echo 방지)

**`GET /api/products/search?q=검색어`** — [app/api/products/search/route.ts](../app/api/products/search/route.ts)
- `lib/search.ts`의 다중 키워드 AND 매칭·상품명 우선순위 로직 호출
- 응답: `SearchResponse` = `{ query, products, keywords }` — 상품 결과와 연관 분류명 키워드를 한 번에 담아 드롭다운이 fetch 1회로 두 레이어를 그림
- 에러: q 누락·공백이면 400

### 응답 타입 계약

[app/lib/api-types.ts](../app/lib/api-types.ts)에 정의. route(서버)와 fetch(클라이언트)가 **같은 타입을 import**해서 응답 구조 불일치를 컴파일 타임에 잡는다.
상품 필드는 별도 DTO 없이 기존 `ProductSummary` / `ProductDetail`을 그대로 재사용.
모든 4xx/5xx 바디는 `ApiError` = `{ error: string }` 형태로 통일.

### 클라이언트 fetch 패턴

- **디바운스 300ms** (Header): 타이핑 중 키 간격(150~250ms, 한글 IME는 자모 단위 onChange)보다 길고 체감 지연 한계(~400ms)보다 짧은 구간. 겹친 요청은 AbortController로 취소해 응답 순서 역전을 방지.
- **stale-while-loading** (Header): 새 응답이 올 때까지 이전 결과를 유지해 드롭다운 깜빡임 방지. 입력이 비거나 폼이 닫히면 즉시 리셋.
- **key 리마운트** (SearchResults): 서버 셸이 `<SearchResults key={query}>`로 렌더 — 검색어가 바뀌면 리마운트되어 항상 loading부터 시작, 수동 상태 리셋 불필요.
- **프리페치 + 모듈 캐시** (AddToCartModal): `prefetchRecommendPool(대분류)`을 OrderArea 마운트 시 호출. 값 캐시(동기 조회)와 진행 중 Promise 캐시(중복 fetch 방지)를 분리. 실패 시 추천 섹션만 조용히 생략.

---

## 6. 데이터를 바꿀 때 API 쪽에서 신경 쓸 것

- **API route는 수정 불필요.** `/api/products`(목록·카테고리 필터), `/api/products/[id]`(상세), `/api/products/search`(검색) 모두 catalog·getDetail을 호출만 하므로 데이터 변경이 즉시 반영된다.
- 검색도 등록 불필요 — `lib/search.ts`는 `name`·`category[]`·`categoryTags[]`를 스캔하는 순수 매칭이라 새 상품·카테고리가 자동으로 잡힌다.
- 카테고리 필터 축도 자동 — `lib/filter-dimensions.ts`의 `ALL_FILTER_AXES`를 기본값으로 실제 옵션이 있는 축만 노출. 기본과 다르게 제어할 카테고리만 `FILTER_AXES_BY_CATEGORY`에 override.
- **새 카테고리 페이지**를 만들 때만 예외적으로 코드 수정 범위가 넓어진다: `lib/category-codes.ts`의 CATEGORY_TREE, `app/components/category/categoryConfig.ts`의 CATEGORY_CONFIG, 필요시 `lib/filter-dimensions.ts`.
- AddToCartModal의 추천 상품은 대분류 풀을 **세션(모듈 레벨) 캐시**로 들고 있음 — dev 중 데이터를 바꿨는데 모달 추천이 그대로면 브라우저 새로고침으로 캐시가 비워진 것인지부터 확인.
