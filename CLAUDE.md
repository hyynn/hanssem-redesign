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
- lib/: 라우트에 속하지 않는 공통 데이터/유틸 (예: category-codes.ts, lib/products/)
  - app/ 폴더와 같은 위치(프로젝트 루트)에 생성, Next.js 라우팅 규칙과 무관한 영역임을 명확히 구분

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

## 상품코드 체계 (10자리)
- 1~2자리: 대분류 코드 (10부터 시작, category-codes.ts의 CATEGORY_TREE 참조)
- 3~4자리: 중분류 코드 (대분류 내에서 10부터 시작)
- 5~6자리: 소분류 코드 (중분류 내에서 10부터 시작)
- 7~9자리: 상품 일련번호 (3자리, 001부터)
- 10자리: 옵션 번호 — "메인"이라는 별도 개념 없음. 같은 패밀리(형제 SKU) 전체를
  가격 오름차순으로 정렬해 0번부터 그대로 부여 (최대 9개, 가장 저렴한 구성이 자동으로 0번)
- 카테고리 코드는 한 번 부여되면 절대 재배치하지 않음. 새 카테고리/하위항목 추가 시
  항상 다음 빈 번호를 이어붙임
- "샘키즈"처럼 다른 중분류와 내용이 중복되는 큐레이션성 메뉴는 코드를 부여하지 않고
  별도 boolean 태그로 관리
- 최상단 내비게이션에 단독으로 보이지만 실제로는 다른 대분류 하위 항목인 메뉴
  (예: 커튼·블라인드 → 홈&데코 하위)는 바로가기로만 처리, 별도 코드 부여하지 않음
- 홈&데코 카테고리는 현재 범위 제외(보류), 추가 시 17번부터 이어붙임

## 카테고리 다중 소속 처리
- 소분류 중 일부는 서로 다른 분류 축(스타일/사이즈 등)이 겹쳐서 한 상품이 여러
  소분류에 동시 해당될 수 있음 (예: 호텔침대이면서 퀸·킹침대인 경우)
- 상품코드의 소분류 슬롯은 대표/주 분류 1개만 담당
- 스타일 축(예: 호텔침대, 수납침대)은 상품코드 소분류에서 파생 — ProductDetail에 별도 저장하지 않음
- 코드에 담을 수 없는 나머지 축(사이즈·구성·기능)은 ProductDetail.filterAttributes에 저장
  `filterAttributes?: { size?: string[]; config?: string[]; feature?: string[] }`
- 카테고리별 필터 칩 노출 정의(옵션 목록·라벨)는 lib/filter-dimensions.ts의
  FILTER_DIMENSIONS_BY_CATEGORY에서 관리
- 샘키즈/베스트셀러를 코드에서 제외한 것과 동일한 원칙의 연장

## 상품 카드 노출 방식
- 같은 패밀리(형제 SKU)를 하나로 묶어 대표 카드 하나로 보여주지 않음
- 한샘 원본과 동일하게 각 SKU를 독립된 카드로 노출 (각 옵션이 자기 썸네일 + 자기 가격을 가짐)
- 패밀리 단위 "최저가부터" 묶음 노출 방식은 채택하지 않음

## 폴더 네이밍
- 패밀리(형제 SKU 공유 이미지) 폴더: {카테고리슬러그}-{패밀리명} (예: bed-mono-bed)
- SKU별 폴더: 10자리 상품코드 그대로, 패밀리 폴더 안에 nesting
  (예: bed-mono-bed/1010120010/)
- 패밀리 코드(상품코드 앞 9자리)↔슬러그 매핑은 app/lib/products/families/index.ts의
  FAMILY_REGISTRY에서 자동 집계, 수기로 별도 관리하지 않음

## 상세페이지 섹션 카탈로그
- ProductDetailTabs에 쓰이는 section id/label은 반드시 section-catalog.ts에 정의된 값만 사용
- 카테고리별 허용 섹션 목록은 category-sections.ts에서 관리

## 카테고리 코드
- category-codes.ts의 CATEGORY_TREE 참조 (menu-tree.json 기반 자동 생성)
- buildCategoryCode(), getCategoryPath(), parseProductCode() 헬퍼 사용

## 이미지
- 현재 모든 이미지 경로는 /images/*.jpg placeholder 상태, public/images/
  폴더에 실제 이미지 채워야 함

## 알려진 이슈 / 주의사항
- globals.css는 CSS Module이 아니므로 `import styles from`으로 받으면
  styles가 undefined가 됨. `import './globals.css'`처럼 사이드이펙트로만
  import할 것
- 베스트셀러 섹션은 풀블리드(100vw) + 무한 가로 스크롤(marquee) 형태,
  컨테이너 max-width를 벗어나야 함
- 상품 카드(가격+할인율+평점+태그 등 정보량 많은 카드)는 그리드보다
  세로 리스트가 적합 (정보 밀도 문제로 그리드 압축 시 텍스트 깨짐)