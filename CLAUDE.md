@AGENTS.md

## 프로젝트 목적
- 한샘 공식몰 리디자인 포트폴리오 (퍼블리셔 + UI/UX 디자이너 역량 어필용)
- 기존 디자인의 정보 요소(가격/할인율/배지/태그)는 유지하면서,
  구조와 비주얼 위계 + 인터랙션의 절제된 고급스러움을 재설계하는 방향
- 모든 디자인 결정은 면접에서 "왜 이렇게 했나"에 답할 수 있어야 함
- 단, 레이아웃/디자인 방향을 임의로 바꾸지 말고, 기존에 정해진 디자인
  시스템(컬러 토큰, hover 규칙 등) 안에서만 판단할 것

## 기술 스택
- Next.js App Router (Pages Router 아님)
- 스타일링: CSS Modules (Tailwind 유틸리티 클래스도 일부 혼용 중 - layout.tsx의 h-full, flex 등)
- 폰트: Pretendard (next/font 아닌 @font-face로 globals.css에 직접 정의)

## 디렉토리 규칙
- app/page.tsx, app/layout.tsx: Next.js 예약 파일명, 이름 변경 금지
- 공통 컴포넌트는 app/components/ 에 위치 (Header, Hero, ProductCard,
  BestSellerMarquee, SpaceCuration 등)
- 각 컴포넌트는 자기 이름과 동일한 .module.css 파일을 짝으로 가짐
- lib/ (프로젝트 루트): 라우팅·렌더링과 무관한 순수 유틸/코드 체계
  - category-codes.ts (카테고리 트리 & 코드 헬퍼)
  - filter-dimensions.ts (카테고리별 필터 칩 옵션 정의)
  - reviews.ts (calculateReviewSummary 헬퍼)
- app/lib/: Next.js 라우팅 범위 내 상품 데이터
  - types.ts (TypeScript 타입 정의 — Product, ProductDetail, Review 등)
  - catalog.ts (전체 상품 목록)
  - products/ (SKU별 데이터 파일, 패밀리 데이터)

## "use client" 경계 규칙
- Next.js App Router 기본은 서버 컴포넌트. 아래 경우에만 파일 상단에 "use client" 선언:
  - useState / useReducer / useRef / useCallback 사용
  - useEffect / 브라우저 API (window, document) 사용
  - 이벤트 핸들러(onClick 등)가 인라인이 아닌 함수로 분리된 경우
- 정적 데이터 렌더링만 하는 컴포넌트에는 "use client" 추가 금지

## 디자인 시스템
- 컬러: globals.css의 :root 변수만 사용, 하드코딩 금지
- 현재 정의된 :root 변수 목록:
  - --color-bg: #ffffff (페이지 배경)
  - --color-bg-secondary: #f8f8f8 (섹션 배경, 슬롯 배경 등 subtle 배경)
  - --color-text-heading: #1a1a1a (제목, 강조 텍스트)
  - --color-text-body: #333333 (본문 텍스트, 기본 텍스트 컬러)
  - --color-text-muted: #505050 (보조 텍스트, 레이블)
  - --color-gray-light: #d0d0d0 (subtle 보더, 구분선)
  - --color-accent: #1a1a1a (버튼 보더, 버튼 배경, 인터랙티브 요소 강조색)
  - --color-sale: #ff4d4f (할인율, 판매가 강조 — 이 색만 사용)
  - --max-width: 1440px
  - --detail-max-width: 1200px
  - --detail-content-width: 900px
  - --header-height: 80px
  - --product-tab-height: 50px
- 존재하지 않는 변수 사용 금지: --color-text, --color-border, --color-bg-subtle 등
  이전 버전 변수명이며 현재 :root에 없음
- 포인트 컬러는 의도적으로 최소화 (상품 카테고리가 광범위해서 화이트/그레이
  베이스 유지, 할인율은 빨강(--color-sale) 고정)
- 한샘 로고 단독 사용 (W CONCEPT 콜라보 표기 제거됨)

## 인터랙션 규칙
- hover 시 box-shadow + translateY 조합이나 image hover시 zoom(scale) 금지 ("AI스러운" 느낌으로 판단,
  제외 결정됨)
- 대신 이미지 변경이나 텍스트 underline 애니메이션 같은 절제된
  인터랙션 사용
- 상품 카드(ProductCard) hover: 텍스트 underline 대신 `hoverImage`(갤러리 2번째 이미지)로
  크로스페이드(opacity transition) — 패밀리 추가 시 `hoverImageFor` 헬퍼로 자동 파생됨
- 위시리스트 하트 아이콘: 클릭 시 빨간색으로 토글 (useState, client component)
- 아이콘 rotate 애니메이션 금지: open/closed 상태 전환 시 CSS transform rotate 사용 금지.
  상태별로 다른 SVG path를 조건부 렌더링으로 처리할 것 (예: 토글 화살표 ▲/▼)
- 영상(LazyVideo): 뷰포트 진입 시 lazy load 후 재생, 벗어나면 일시정지,
  다시 진입하면 이어서 재생. 뷰포트 안에 머무는 동안은 loop.
  (사용자 의도 없는 반복 재생 방지를 위한 IntersectionObserver 기반 제어)

## 상품코드 체계 (10자리) & 카테고리 코드
- 코드 구조: [대분류 2자리][중분류 2자리][소분류 2자리][일련번호 3자리][옵션 1자리]
  - 대분류: 10부터 시작 / 중분류: 대분류 내 10부터 / 소분류: 중분류 내 10부터
  - 일련번호: 3자리, 001부터
  - 옵션 번호: "메인" 개념 없음. 같은 패밀리 전체를 가격 오름차순 정렬 후 0번부터 부여
    (최대 9개, 가장 저렴한 구성이 자동으로 0번)
- 카테고리 정의 위치: lib/category-codes.ts의 CATEGORY_TREE (menu-tree.json 기반 자동 생성)
  - 헬퍼: buildCategoryCode(), getCategoryPath(), parseProductCode()
- 코드 불변 원칙: 한 번 부여된 코드는 절대 재배치 금지. 추가 시 항상 다음 빈 번호 이어붙임
- 코드 미부여 케이스:
  - "샘키즈"처럼 다른 중분류와 내용이 중복되는 큐레이션성 메뉴 → boolean 태그로 관리
  - 내비게이션 최상단에 보이지만 실제로는 다른 대분류 하위인 메뉴
    (예: 커튼·블라인드 → 홈&데코 하위) → 바로가기로만 처리
- 홈&데코 카테고리는 현재 범위 제외(보류), 추가 시 17번부터 이어붙임

## 카테고리 다중 소속 처리
- 한 상품이 여러 소분류에 동시 소속될 수 있음 (예: 호텔침대이면서 Q/K침대이면서 수납침대)
- `category[]` (ProductSummary): 상품의 주 분류 경로. 마지막 항목이 primary 소분류
  - **primary 소분류 선택 원칙**: 스타일/타입 축(호텔침대, 저상형·패밀리침대 등)을 우선.
    사이즈(Q/K, KK)·수납 여부 같은 서브 옵션 축은 categoryTags에 넣을 것
- `categoryTags?: string[]` (ProductSummary): 추가 소분류 소속 (다중 허용)
  - 예: `categoryTags: ["수납침대", "Q/K침대"]`
  - `getByCategory(cat)`는 `category[]`와 `categoryTags[]` 모두 검색함
- 상품코드의 소분류 슬롯은 코드로 표현 가능한 primary 분류 1개만 담당
- 필터 UI용 속성(사이즈·구성·기능)은 `filterAttributes`에 별도 저장
  `filterAttributes?: { size?: string[]; config?: string[]; feature?: string[] }`
- **⚠️ 중요: `filterAttributes`는 반드시 `summaries[]` 항목에 직접 넣어야 함**
  - 카테고리 페이지 필터는 `ProductSummary` 배열(`allProducts`)을 스캔 → summaries에 없으면 필터 미노출
  - `variantDetails`의 `filterAttributes`는 상세 페이지 전용 — summaries와 동일한 값을 양쪽 모두에 작성
- 카테고리 필터는 `lib/filter-dimensions.ts`의 `ALL_FILTER_AXES`를 기본값으로 products를 스캔해
  실제 옵션이 있는 축만 자동 노출 (새 카테고리 추가 시 별도 등록 불필요)
  - `FILTER_AXES_BY_CATEGORY`: 기본값과 다르게 제어해야 할 카테고리만 override 등록

## SKU 구성 원칙
- **컬러 전용 변형** → 단일 SKU로 통합. `colors: string[]`에 **한글 색상명** 배열 저장, 별도 SKU 코드 부여 금지
  - 예: 차콜/화이트 두 색상 = 1 SKU, `colors: ["차콜", "화이트"]`
  - hex 코드 직접 저장 금지. 렌더링 시 `lib/filter-dimensions.ts`의 `COLOR_HEX` 맵으로 변환
  - 카드 1장만 노출; `variantLabel` 필드 불필요 (사용 금지)
- **구성이 다른 변형** (사이즈·구성품·기능·모듈 조합 등) → 각각 별도 SKU
  - 예: Q/K 단품 / KK 단품 / Q/K+매트 / KK+매트 = 4 SKU
  - 각 SKU 내부에 `colors[]`로 컬러 옵션 추가 가능
  - SKU마다 카드 1장씩 독립 노출

## 상품 카드 노출 방식
- 컬러 전용 변형은 1 SKU → 카드 1장 (colors 칩으로 색상 표시)
- 구성이 다른 SKU는 각각 독립 카드로 노출 (자기 썸네일 + 자기 가격)
- 패밀리 단위 "최저가부터" 묶음 노출 방식은 채택하지 않음

## 리뷰/문의 데이터 규칙
- 평점·리뷰수·평점 분포는 items 배열에서 lib/reviews.ts의 calculateReviewSummary()로
  자동 계산, ReviewData에 하드코딩 금지
- 리뷰 정렬: 평점순 정렬 시 동점이면 최신순으로 2차 정렬
- 문의(QnA): 카테고리 필터([전체]/[상품]/[배송]/[기타]) + 정렬은 항상 최신순 고정

## reviews.ts 파일 패턴 (기준: bedroom/mattress/101111001/reviews.ts)
- 임포트 순서: `import type { ReviewData, QnaItem, Review }` → `import { calculateReviewSummary }`
- 내부 배열: `const reviewItems: Review[] = [...]` (named const, 타입 명시)
- **리뷰 객체는 항상 멀티라인 포맷** (한 줄 압축 포맷 금지) — 필드마다 줄바꿈, 가독성 우선
- `userName` / `questioner` 형식: **영문 소문자 2자리 + `*****`(별 5개)** 고정
  - 예: `"ho*****"`, `"ks*****"` — 한국어 이름(`"홍*희"`) 형식 사용 금지
- `content`: **2문장 내외의 서술형** 작성 (한 줄짜리 단문 금지). 제품 사용 경험 + 디테일한 소감/아쉬운 점을
  자연스럽게 묶어서 작성 (예: "가격이 있지만 그 이상의 퀄리티를 제공합니다. 거실 분위기가 완전히 달라졌어요.")
- `rating` 값: **정수만** 허용 (1–5, 소수점 금지)
  - 5점 위주이되 4점을 자연스럽게 섞고, 리얼리티를 위해 **3점도 1~2건 정도 포함** (배송 지연, 미세한 흠집,
    뻑뻑한 도어 등 사소한 불편 사유로 작성). 별점 내림차순 정렬 금지 — 시간순으로 섞어서 배치
- 리뷰 id: `"r-{그룹문자}NN"` 형식 — variant 그룹별 a/b/c/d… + 두 자리 번호
  - 단일 variant면 `"r-a01"` ~ `"r-aNN"`, 복수 variant면 그룹마다 `a / b / c …`
  - 그룹 구분은 배열 내부에 `// ── {variant 라벨} ──` 인라인 주석으로 표시 (파일 상단 요약 주석 금지)
- `images` 경로: `/images/reviews/{productId}/review-{NN}-{seq}.webp`
  - `{NN}`은 해당 리뷰 id의 그룹문자를 뗀 두 자리 번호 (예: `r-a07` → `review-07-1.webp`)
  - 포토 리뷰는 전체 기간에 걸쳐 분산 배치하되, 최신 리뷰(배열 앞쪽) 쪽에 더 많은 비중을 둘 것
    (오래된 리뷰까지 끊기지 않게 1~2건은 남기되, 한쪽에만 몰아넣지 말 것)
- 문의 id: `"q-{그룹문자}NN"` 형식 (리뷰 그룹과 동일한 문자 사용)
- 답변 형식: 반드시 `"안녕하세요, 한샘입니다. "` 로 시작
- 미답변 문의: `answered: false`, `answer` / `answerDate` 필드 생략, 배열 맨 뒤에 배치
- 내보내기 형식:
  ```ts
  export const sharedReviews: ReviewData = {
    ...calculateReviewSummary(reviewItems),
    items: reviewItems,
  };
  export const sharedQnaItems: QnaItem[] = [...];
  ```

## 패밀리 데이터 폴더 구조
- 코드 경로: `app/lib/products/families/{대분류slug}/{중분류slug}/{FAMILY_CODE}/`
  - 대분류/중분류는 영문 slug (bedroom/bed, living/sofa 등)
  - {FAMILY_CODE}는 상품코드 앞 9자리 (불변, 예: 101012001)
  - 예: `app/lib/products/families/bedroom/bed/101012001/`
- 각 패밀리 폴더는 3개 파일로 구성:
  - `index.ts` — familyObj, variantDetails, summaries[], getDetail() 핵심
  - `sections.ts` — FAMILY_PATH, FAMILY_CODE, deliveryGuides, createSections()
  - `reviews.ts` — sharedReviews, sharedQnaItems
- **index.ts 내부 선언 순서 (반드시 준수)**:
  1. `familyObj` (sharedImages 포함)
  2. `VariantData` 타입 선언
  3. `variantDetails` — SKU별 variantImages, filterAttributes, sections
  4. `thumbnailFor` / `hoverImageFor` helper 함수
  5. `summaries[]`
  6. `getDetail()` — 가장 마지막
- **thumbnail 파생 규칙 (하드코딩 금지)**:
  - `variantDetails`와 `summaries` 사이에 아래 helper를 반드시 작성:
    ```ts
    function thumbnailFor(id: string): string {
      return variantDetails[id].variantImages[0] ?? XxxFamily.sharedImages[0];
    }
    ```
    (`XxxFamily`는 해당 파일의 familyObj 변수명으로 교체)
  - `summaries`의 thumbnail은 `thumbnailFor("SKU_ID")`로만 설정, 예외 없음
  - 단일 SKU: `variantImages: []` → `variantImages[0]`이 undefined → 자동으로 `sharedImages[0]` 폴백
  - 다중 SKU: `variantImages: ["...main-01.webp"]` → `variantImages[0]` 사용
  - 문자열 경로 직접 작성 / `familyObj.sharedImages[0]` 직접 참조 모두 금지
- **hoverImage 파생 규칙 (ProductCard hover 크로스페이드용, 하드코딩 금지)**:
  - `thumbnailFor` 바로 다음에 `app/lib/types.ts`의 `assembleGallery`를 이용해 아래 helper를 반드시 작성:
    ```ts
    function hoverImageFor(id: string): string | undefined {
      return assembleGallery({ sharedImages: XxxFamily.sharedImages, variantImages: variantDetails[id].variantImages })[1];
    }
    ```
    (`XxxFamily`는 `thumbnailFor`와 동일한 familyObj 변수명)
  - `summaries`의 `hoverImage`는 `thumbnail: thumbnailFor(...)` 바로 다음 줄에 `hoverImage: hoverImageFor("SKU_ID")`로만 설정, 예외 없음
  - `assembleGallery`가 만드는 갤러리 순서(`-main-` 이미지 → sharedImages → 나머지 variantImages)상 1번 인덱스를 그대로 사용 — 갤러리 2번째 이미지가 없으면 자동으로 `undefined` (hover 시 썸네일 유지, 별도 처리 불필요)
- 새 패밀리 추가 시 **4곳 모두** 수정 (하나라도 빠지면 상세 페이지 404):
  1. 새 폴더 생성 후 index.ts / sections.ts / reviews.ts 작성
  2. `app/lib/products/families/index.ts` — FAMILY_REGISTRY에 import 1줄 + 항목 1줄
  3. `app/lib/products/index.ts` — summaries import + getDetail import + registry Object.fromEntries 1줄
  4. `app/lib/catalog.ts` — summaries spread 추가

## 폴더 네이밍 (이미지)
- 이미지 경로: `public/images/products/{대분류slug}/{중분류slug}/{FAMILY_CODE}/`
  - 코드 데이터 경로(`app/lib/products/families/...`)와 대분류/중분류/FAMILY_CODE 구조 동일
  - 예: `public/images/products/bedroom/bed/101012001/`
- 패밀리 공유 파일(섹션·갤러리): `{FAMILY_CODE}-{종류}-{번호}.{ext}` 형식
  - 예: `101012001-shared-01.webp`, `101012001-basic-01.mp4`
- SKU별 서브폴더: 10자리 상품코드 그대로 패밀리 폴더 안에 nesting
  - 예: `bedroom/bed/101012001/1010120010/1010120010-main-01.webp`
- 코드에서 경로 상수: `FAMILY_PATH = "{대분류slug}/{중분류slug}/{FAMILY_CODE}"` (sections.ts에 정의)
  - 파일명 prefix로는 `FAMILY_CODE`를 직접 사용
- 패밀리 코드 ↔ 경로 매핑은 `app/lib/products/families/index.ts`의 FAMILY_REGISTRY에서 관리

## 상세페이지 섹션 카탈로그
- **모든 패밀리의 sections.ts는 아래 5개 섹션을 기본 구성으로 작성**:
  | id | label | 내용 |
  |----|-------|------|
  | `"basic"` | 기본정보 | 제품 소개 텍스트 + 대표 이미지 |
  | `"function"` | 기능 | 기능별 이미지 + 설명 |
  | `"material"` | 소재 | 소재 클로즈업 이미지 + 설명 |
  | `"size"` | 사이즈 | 사이즈 안내 이미지 |
  | `"warranty"` | 품질보증 | 한샘 품질보증 텍스트 (고정 문구) |
- section id/label은 각 패밀리 폴더의 sections.ts의 createSections() 안에서 직접 정의
- 카테고리 고유 섹션이 필요한 경우에만 위 5개 외에 새 id 추가, 없애거나 순서 바꾸지 말 것

## 이미지 포맷 규칙
- 기본: `.webp` (정적 이미지 전반)
- 움직임이 필요한 구간(소재 질감, 기능 시연 등): `.mp4`가 기본 선택
- `.gif`: 압축 효율이 낮아 용량이 크게 늘어나므로(예: 4.5MB) 원칙적으로 mp4로 변환.
  꼭 필요한 경우에만 예외적으로 유지.

## 가로 스크롤 버튼 공통 패턴
- `canScroll: boolean | null`로 초기화, ResizeObserver로 스크롤 가능 여부 측정 후 갱신
- `atStart` / `atEnd`는 scroll 이벤트마다 갱신
- `canScroll !== true`이면 좌우 버튼 모두 숨김 — null(측정 전) 포함.
  값이 정해지기 전 잘못된 기본값으로 버튼이 깜빡이는 것을 방지하기 위함
- **숨김 CSS는 반드시 `display: none`** — `visibility: hidden`은 공간을 차지하므로 사용 금지
- 새로 가로 스크롤 컴포넌트를 만들 때 이 패턴을 그대로 재사용

## 모달 공통 규칙
- `createPortal`로 `document.body`에 직접 렌더링
  (부모 요소의 `transform`이 `position: fixed` 자식의 containing block이 되는 문제 방지)
- z-index는 Header(100)보다 항상 높게 설정 (현재 모달 backdrop: 200)
- 스크롤 잠금 순서: `overflow: hidden` 적용 *전*에 `scrollbarWidth` 계산 →
  `body.paddingRight`로 보정 → cleanup에서 `overflow` / `paddingRight` 둘 다 복원
- Esc 키로 닫기 지원 (keydown 이벤트, cleanup에서 removeEventListener)

## 알려진 이슈 / 주의사항
- globals.css는 CSS Module이 아니므로 `import styles from`으로 받으면
  styles가 undefined가 됨. `import './globals.css'`처럼 사이드이펙트로만
  import할 것
- 베스트셀러 섹션은 풀블리드(100vw) + 무한 가로 스크롤(marquee) 형태,
  컨테이너 max-width를 벗어나야 함
- 상품 카드(가격+할인율+평점+태그 등 정보량 많은 카드)는 그리드보다
  세로 리스트가 적합 (정보 밀도 문제로 그리드 압축 시 텍스트 깨짐)