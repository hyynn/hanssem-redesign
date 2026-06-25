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
- 컬러: globals.css의 :root 변수(--color-bg, --color-text, --color-sale 등)
  사용, 하드코딩 금지
- 포인트 컬러는 의도적으로 최소화 (상품 카테고리가 광범위해서 화이트/그레이
  베이스 유지, 할인율은 빨강(--color-sale) 고정)
- 한샘 로고 단독 사용 (W CONCEPT 콜라보 표기 제거됨)

## 인터랙션 규칙
- hover 시 box-shadow + translateY 조합 금지 ("AI스러운" 느낌으로 판단,
  제외 결정됨)
- 대신 이미지 미세 줌(scale) 또는 텍스트 underline 애니메이션 같은 절제된
  인터랙션 사용
- 위시리스트 하트 아이콘: 클릭 시 빨간색으로 토글 (useState, client component)
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
- 카테고리별 필터 칩 노출 정의(옵션 목록·라벨)는 lib/filter-dimensions.ts의
  FILTER_DIMENSIONS_BY_CATEGORY에서 관리

## 상품 카드 노출 방식
- 같은 패밀리(형제 SKU)를 하나로 묶어 대표 카드 하나로 보여주지 않음
- 한샘 원본과 동일하게 각 SKU를 독립된 카드로 노출 (각 옵션이 자기 썸네일 + 자기 가격을 가짐)
- 패밀리 단위 "최저가부터" 묶음 노출 방식은 채택하지 않음

## 리뷰/문의 데이터 규칙
- 평점·리뷰수·평점 분포는 items 배열에서 lib/reviews.ts의 calculateReviewSummary()로
  자동 계산, ReviewData에 하드코딩 금지
- 리뷰 정렬: 평점순 정렬 시 동점이면 최신순으로 2차 정렬
- 문의(QnA): 카테고리 필터([전체]/[상품]/[배송]/[기타]) + 정렬은 항상 최신순 고정

## 패밀리 데이터 폴더 구조
- 코드 경로: `app/lib/products/families/{대분류slug}/{중분류slug}/{FAMILY_CODE}/`
  - 대분류/중분류는 영문 slug (bedroom/bed, living/sofa 등)
  - {FAMILY_CODE}는 상품코드 앞 9자리 (불변, 예: 101012001)
  - 예: `app/lib/products/families/bedroom/bed/101012001/`
- 각 패밀리 폴더는 3개 파일로 구성:
  - `index.ts` — summaries[], variantDetails, monoBedFamily, getDetail() 등 핵심
  - `sections.ts` — FAMILY_FOLDER, FAMILY_CODE, deliveryGuides, createSections()
  - `reviews.ts` — sharedReviews, sharedQnaItems
- 새 패밀리 추가 시 수정 파일:
  1. 새 폴더 생성 후 index.ts / sections.ts / reviews.ts 작성
  2. `app/lib/products/families/index.ts`의 FAMILY_REGISTRY에 import 1줄 + 항목 1줄
  3. `app/lib/products/index.ts`에 registry 항목 추가
  4. `app/lib/catalog.ts`에 summaries spread 추가

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
- section id/label은 각 패밀리 폴더의 sections.ts의 createSections() 안에서 직접 정의
- 현재 사용 중인 section id: "basic" / "function" / "material" / "size" / "warranty"
- 새 패밀리 추가 시 위 id를 우선 재사용하고, 카테고리 고유 섹션만 새 id 부여

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