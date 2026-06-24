# 한샘 리디자인 (Hanssem Redesign)

한샘 공식몰을 리디자인한 퍼블리셔 + UI/UX 디자이너 포트폴리오 프로젝트입니다.
기존 사이트의 정보 요소(가격/할인율/배지/태그)는 유지하면서, 구조와 비주얼 위계,
인터랙션의 절제된 고급스러움을 재설계하는 데 초점을 맞췄습니다.

모든 디자인 결정은 "왜 이렇게 했는가"에 답할 수 있도록 의도를 가지고 진행했습니다.

**배포 링크**: https://hanssem-redesign.vercel.app/

---

## 기술 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (+ 일부 Tailwind 유틸리티 클래스 혼용)
- **Font**: Pretendard (`@font-face`로 직접 정의)
- **배포**: Vercel (GitHub 연동, push 시 자동 배포)

---

## 주요 기능

상품 상세페이지는 패밀리(형제 SKU)와 개별 SKU를 분리한 타입 계층으로 설계했습니다.
같은 침대 패밀리라도 사이즈·매트리스 포함 여부에 따라 갤러리 구성이 달라져야 했기
때문에, 대표 이미지·공유 이미지·SKU 전용 이미지를 한 곳(`assembleGallery`)에서만
조합하도록 단일화했습니다. 옵션 선택 UI는 가로 스크롤 가능 여부를 동적으로 감지해
불필요할 때는 좌우 버튼이 보이지 않도록 처리했습니다.

리뷰는 평점·리뷰수·평점 분포를 손으로 적지 않고 실제 리뷰 데이터에서 매번
계산하도록 했습니다(`calculateReviewSummary`). 그래야 리뷰가 늘어나도 숫자가
어긋날 일이 없기 때문입니다. 포토 리뷰는 클릭하면 모달로 확대되고, 리뷰 간
이전/다음 탐색과 이미지 썸네일 전환이 가능합니다. 문의 탭은 카테고리 필터와
최신순 정렬을 함께 적용했습니다.

영상은 사용자가 보고 있는 동안에만 재생되고 화면을 벗어나면 멈추도록 했습니다 —
의도하지 않은 반복 재생이 "절제된" 인터랙션 원칙과 맞지 않다고 판단했습니다.

상품코드는 10자리(대분류 2 + 중분류 2 + 소분류 2 + 상품번호 3 + 옵션 1)로
설계했고, 옵션 번호는 패밀리 내 가격 오름차순으로 자동 부여됩니다. 호텔침대이면서
퀸·킹침대인 경우처럼 한 상품이 여러 분류에 걸치는 경우는 코드에 억지로 인코딩하지
않고 별도 필터 속성(`filterAttributes`)으로 관리합니다.

---

## 디자인 시스템

- 컬러: `globals.css`의 CSS 변수(`--color-text`, `--color-sale` 등) 기반, 하드코딩 금지
- 포인트 컬러 최소화 (화이트/그레이 베이스 + 할인율만 빨강으로 고정)
- 인터랙션: hover 시 `box-shadow` + `translateY` 조합 금지 — 이미지 미세 줌, 텍스트 underline 등 절제된 방식 사용
- 영상/모달 등 동적 인터랙션도 "사용자 의도 없이 반복 재생되지 않기"를 원칙으로 설계

---

## 프로젝트 구조 (요약)

```
app/
├── components/           # 공통 컴포넌트 + product-detail 하위 컴포넌트
├── lib/
│   ├── catalog.ts         # 상품 카드 공통 정보 (단일 소스)
│   ├── types.ts           # 타입 정의 + assembleGallery 등 헬퍼
│   └── products/
│       ├── {code}.ts      # SKU별 데이터
│       └── families/      # 패밀리 공유 데이터 (sharedImages, 섹션 등)
└── products/[id]/         # 라우트 (data/는 lib/products의 thin shim)

lib/
├── category-codes.ts      # 카테고리 코드 트리 + 헬퍼
├── filter-dimensions.ts   # 카테고리별 필터 축 정의
└── reviews.ts             # 리뷰 평점/분포 계산 유틸
```

---

## AI 협업 방식

Claude로 설계를 논의·검증하고 Claude Code로 구현했습니다. 설계 결정과 코드
검증은 직접 진행했고, 코드가 정한 규칙과 어긋나는 부분이 보이면 그때마다 다시
지시해서 고쳤습니다.

- `CLAUDE.md`: 디자인 시스템, 데이터 구조 등 이 프로젝트의 규칙을 정리한 문서
- `AGENTS.md`: Next.js 버전 변화로 AI가 오래된 정보를 따르지 않도록 둔 안전장치

---

## Getting Started

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 결과를 확인할 수 있습니다.

타입 체크:

```bash
npx tsc --noEmit
```

## 배포

GitHub `main` 브랜치에 push하면 Vercel이 자동으로 빌드/배포합니다.