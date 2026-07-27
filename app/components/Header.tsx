"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";
import type { ProductSummary } from "@/app/lib/types";
import type { SearchResponse } from "@/app/lib/api-types";
import { CATEGORY_CONFIG, CATEGORY_SLUGS } from "@/app/components/category/categoryConfig";
import HeaderDrawer from "./HeaderDrawer";
import HeaderMegaMenu from "./HeaderMegaMenu";
import styles from "./Header.module.css";

/* 하이브리드 드롭다운: 연관 분류명(탐색형) 위, 상품 다이렉트 히트(목적형) 아래 */
const KEYWORD_LIMIT = 4;
const SUGGESTION_LIMIT = 3;
const RECENT_KEY = "hanssem-recent-searches";
const RECENT_LIMIT = 8;
/* 300ms: 연속 타이핑 중 키 간격(150~250ms, 한글 IME는 자모 단위로 onChange 발생)보다 길어
   입력이 멈춘 시점에만 fetch가 나가고, 체감 지연 한계(~400ms)보다는 짧아 반응이 늦다고
   느껴지지 않는 구간. 디바운스를 뚫고 겹친 요청은 AbortController가 취소 */
const SEARCH_DEBOUNCE_MS = 300;

/* fetch 자동완성의 화면 상태 — idle(빈 입력), loading(첫 결과 대기),
   done(성공, 빈 결과 포함), error(요청 실패) */
type SearchStatus = "idle" | "loading" | "done" | "error";

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 상품명에서 검색 토큰과 일치하는 부분만 font-weight 강조 */
function HighlightedName({ name, query }: { name: string; query: string }) {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return <>{name}</>;
  const re = new RegExp(`(${tokens.map(escapeRegExp).join("|")})`, "gi");
  const lowerTokens = tokens.map((t) => t.toLowerCase());
  return (
    <>
      {name.split(re).map((part, i) =>
        lowerTokens.includes(part.toLowerCase()) ? (
          <strong key={i}>{part}</strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

// categoryConfig.ts(CATEGORY_SLUGS)를 단일 소스로 삼아 카테고리 링크를 파생 —
// HeaderMegaMenu·HeaderDrawer도 같은 소스를 쓰므로 카테고리 구성이 바뀌어도
// 한 곳(categoryConfig.ts)만 고치면 nav·드로어 전부 자동으로 맞춰짐.
// 이벤트/매거진처럼 카테고리가 아닌 링크만 아래에 수동으로 이어붙인다.
const NAV_ITEMS: { label: string; href: string; prefetch?: false; categorySlug?: string }[] = [
  ...CATEGORY_SLUGS.map((slug) => ({
    label: CATEGORY_CONFIG[slug].mainCategory,
    href: `/category/${slug}`,
    categorySlug: slug as string,
    // 소품(home-deco)만 prefetch 비활성 — 기존 설정 유지
    ...(slug === "home-deco" ? { prefetch: false as const } : {}),
  })),
  { label: "이벤트", href: "/events", prefetch: false },
  { label: "매거진", href: "/magazine", prefetch: false },
];

/* hover로 열린 메가메뉴를 닫는 지연 — navLink에서 패널로 마우스가 이동하는 동안
   경계를 살짝 벗어나도(예: 대각선 이동) 바로 닫히지 않도록 하는 여유 구간 */
const MEGA_MENU_CLOSE_DELAY_MS = 150;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolledOnHome, setScrolledOnHome] = useState(false);
  const isScrolled = !isHome || scrolledOnHome;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [megaSlug, setMegaSlug] = useState(NAV_ITEMS[0].categorySlug ?? "");
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = (slug: string) => {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaSlug(slug);
    setIsMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    megaCloseTimer.current = setTimeout(() => setIsMegaOpen(false), MEGA_MENU_CLOSE_DELAY_MS);
  };
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  // 최근 검색어(localStorage): 렌더에 쓰이는 지점이 전부 isSearchOpen(초기값 false) 뒤에
  // 있어 서버·클라이언트 첫 렌더가 항상 동일 — effect로 미룰 필요 없이 마운트 시점에 바로 읽음
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      return Array.isArray(saved) ? saved.filter((k): k is string => typeof k === "string") : [];
    } catch {
      return [];
    }
  });
  const [prevPathname, setPrevPathname] = useState(pathname);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  const hasQuery = isSearchOpen && Boolean(query.trim());
  const [keywords, setKeywords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<ProductSummary[]>([]);
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");
  // 키보드 내비게이션 인덱스는 키워드 → 상품 순서의 통합 리스트를 순회
  const optionCount = keywords.length + suggestions.length;

  // 자동완성 fetch: 디바운스 + 언마운트/재입력 시 이전 요청 취소.
  // 결과는 다음 응답이 올 때까지 유지(stale-while-loading) — 타이핑마다 깜빡이지 않게
  useEffect(() => {
    const q = query.trim();
    if (!isSearchOpen || !q) return; // 빈 입력 시 초기화는 이벤트 핸들러(resetSearchResults)가 담당
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setSearchStatus("loading");
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`search failed: ${res.status}`);
        const data: SearchResponse = await res.json();
        setKeywords(data.keywords.slice(0, KEYWORD_LIMIT));
        setSuggestions(data.products.slice(0, SUGGESTION_LIMIT));
        setSearchStatus("done");
      } catch {
        // abort는 다음 입력이 이어졌다는 뜻이므로 에러로 표시하지 않음
        if (!controller.signal.aborted) setSearchStatus("error");
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, isSearchOpen]);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolledOnHome(window.scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // 검색창이 열릴 때 포커스만 처리 — 닫힐 때 입력값 초기화는 closeSearch()가 담당
  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  // 메가메뉴가 열려 있을 때 Esc로 닫기
  useEffect(() => {
    if (!isMegaOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMegaOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMegaOpen]);

  // 입력이 비거나 폼이 닫힐 때 이전 결과를 지워, 다음 입력 첫 글자에
  // 직전 검색어의 결과가 잠깐 비치는 것(stale flash)을 방지
  const resetSearchResults = () => {
    setKeywords([]);
    setSuggestions([]);
    setSearchStatus("idle");
  };

  // 검색창을 닫는 모든 경로(버튼·Esc·페이지 이동)가 공유하는 단일 지점 —
  // 닫힘 + 입력값·결과 초기화를 한 번에 처리해 "다시 열면 빈 상태로 시작" 보장
  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery("");
    setActiveIndex(-1);
    resetSearchResults();
  };

  const toggleSearch = () => {
    if (isSearchOpen) closeSearch();
    else setIsSearchOpen(true);
  };

  // 페이지 이동 시 검색폼·메가메뉴 자동 닫힘 — effect 대신 렌더 중 pathname 변화를 감지해
  // 즉시 반영(React 권장 패턴: prop 변화에 따른 상태 리셋은 effect가 아니라 렌더 중 처리)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    closeSearch();
    setIsMegaOpen(false);
  }

  const saveRecent = (list: string[]) => {
    setRecent(list);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  };

  const addRecent = (keyword: string) =>
    saveRecent([keyword, ...recent.filter((k) => k !== keyword)].slice(0, RECENT_LIMIT));

  const removeRecent = (keyword: string) =>
    saveRecent(recent.filter((k) => k !== keyword));

  const searchByKeyword = (keyword: string) => {
    addRecent(keyword);
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const submitSearch = () => {
    // 드롭다운 선택 항목: 키워드면 해당 검색 결과로, 상품이면 상세로.
    // 페이지 이동 시 pathname 변화 감지 로직이 폼을 닫고 입력값을 초기화함
    if (activeIndex >= 0 && activeIndex < keywords.length) {
      searchByKeyword(keywords[activeIndex]);
      return;
    }
    const product = suggestions[activeIndex - keywords.length];
    if (activeIndex >= keywords.length && product) {
      router.push(`/products/${product.id}`);
      return;
    }
    const q = query.trim();
    if (q) searchByKeyword(q);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return; // 한글 IME 조합 중 Enter 무시
    if (e.key === "ArrowDown" && optionCount > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % optionCount);
    } else if (e.key === "ArrowUp" && optionCount > 0) {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? optionCount - 1 : prev - 1));
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* 로고 */}
        <Link href="/" className={styles.logo} aria-label="한샘 홈으로 이동">
          <svg viewBox="0 0 356 34" fill="none" xmlns="http://www.w3.org/2000/svg" width="178" height="17" aria-hidden="true"><g clipPath="url(#clip0_1989_46693)"><path d="M322.95 1.20651L316.65 7.50684L331.329 22.1864L337.63 15.886L322.95 1.20651Z" fill="currentColor"/><path d="M261.43 11.7197H241.64V20.5597H261.43V11.7197Z" fill="currentColor"/><path d="M355.28 1.21973H345.99V32.5897H355.28V1.21973Z" fill="currentColor"/><path d="M315.64 1.21973H306.35V32.5897H315.64V1.21973Z" fill="currentColor"/><path d="M276 1.21973H266.71V32.5897H276V1.21973Z" fill="currentColor"/><path d="M236.35 1.21973H227.06V32.5897H236.35V1.21973Z" fill="currentColor"/><path d="M295.82 1.21973H286.53V32.5897H295.82V1.21973Z" fill="currentColor"/><path d="M8.75 1.21973H0V32.5897H8.75V1.21973Z" fill="currentColor"/><path d="M113.83 10.2898C113.71 8.37977 112.09 7.14977 110.01 7.14977C108.12 7.14977 106.28 7.88977 106.28 9.74977C106.26 12.1898 109.09 12.8998 110.4 13.2898C116.41 15.0798 123.01 16.5098 123.01 23.7198C123.01 30.3798 117.39 33.7998 110.49 33.7998C103.59 33.7998 96.97 30.0498 97.22 22.6798H105.42C105.59 24.9298 107.69 26.8098 110.36 26.8098C112.33 26.8098 114.38 25.9198 114.38 23.9598C114.38 20.7198 107.93 20.8598 103.44 18.4898C99.76 16.5498 97.93 13.3898 97.97 9.71977C97.97 3.62977 103.65 0.00976562 110.12 0.00976562C117.01 0.00976562 122.19 3.92977 122.14 10.2998H113.81L113.83 10.2898Z" fill="currentColor"/><path d="M140.84 10.2898C140.72 8.37977 139.1 7.14977 137.02 7.14977C135.13 7.14977 133.29 7.88977 133.29 9.74977C133.27 12.1898 136.1 12.8998 137.41 13.2898C143.42 15.0798 150.02 16.5098 150.02 23.7198C150.02 30.3798 144.4 33.7998 137.5 33.7998C130.6 33.7998 123.98 30.0498 124.23 22.6798H132.43C132.6 24.9298 134.7 26.8098 137.37 26.8098C139.34 26.8098 141.39 25.9198 141.39 23.9598C141.39 20.7198 134.94 20.8598 130.45 18.4898C126.77 16.5498 124.94 13.3898 124.98 9.71977C124.98 3.62977 130.66 0.00976562 137.13 0.00976562C144.02 0.00976562 149.2 3.92977 149.15 10.2998H140.82L140.84 10.2898Z" fill="currentColor"/><path d="M160.72 26.0497V19.7197H172.69V13.4097H160.72V7.72973H176.17V1.21973H152.36V32.5797H176.57V26.0497H160.72Z" fill="currentColor"/><path d="M95.07 1.21973H86.77V17.6997H86.3L74.21 1.21973H66.37V32.5797H74.66V15.0497H75.08L87.61 32.5797H95.07V1.21973Z" fill="currentColor"/><path d="M12.62 20.1897H22.7V32.5797H31.3V1.21973H22.7V12.9197H12.62V20.1897Z" fill="currentColor"/><path d="M56.75 32.5797H65.1L53.99 1.21973H43.73L32.61 32.5897H40.82L43.15 25.3197H54.43L56.75 32.5897V32.5797ZM48.62 8.77973H48.99L52.25 18.6797H45.35L48.62 8.77973Z" fill="currentColor"/><path d="M216.53 1.21973H207.8V32.5897H216.53V1.21973Z" fill="currentColor"/><path d="M188.54 1.21973H179.44V32.5797H187.95V13.1097H188.26L197.29 21.8297L203.32 15.5997L188.54 1.21973Z" fill="currentColor"/></g><defs><clipPath id="clip0_1989_46693"><rect width="356" height="34" fill="white"/></clipPath></defs></svg>
        </Link>

        {/* 네비게이션 */}
        <nav className={styles.nav}>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className={styles.navItem}
                onMouseEnter={item.categorySlug ? () => openMega(item.categorySlug!) : undefined}
                onMouseLeave={item.categorySlug ? scheduleCloseMega : undefined}
              >
                <Link
                  href={item.href}
                  prefetch={item.prefetch}
                  className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.navActive : ""}`}
                >
                  {item.label}
                </Link>
                {item.categorySlug && isMegaOpen && megaSlug === item.categorySlug && (
                  <HeaderMegaMenu slug={item.categorySlug} />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 우측 아이콘 영역 */}
        <div className={styles.rightArea}>
          {/* 검색 슬롯: 버튼은 항상 DOM에 유지, 폼은 절대위치로 오버레이 */}
          <div className={styles.searchSlot}>
            <button
              className={`${styles.iconBtn} ${styles.searchToggleBtn} ${isSearchOpen ? styles.searchBtnHidden : ""}`}
              onClick={toggleSearch}
              aria-label="검색"
            >
              <span className={styles.iconWrap}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 14.5C12.0376 14.5 14.5 12.0376 14.5 9C14.5 5.96243 12.0376 3.5 9 3.5C5.96243 3.5 3.5 5.96243 3.5 9C3.5 12.0376 5.96243 14.5 9 14.5ZM9 15.5C12.5899 15.5 15.5 12.5899 15.5 9C15.5 5.41015 12.5899 2.5 9 2.5C5.41015 2.5 2.5 5.41015 2.5 9C2.5 12.5899 5.41015 15.5 9 15.5Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.9254 12.9381C13.1207 12.743 13.4373 12.7431 13.6325 12.9385L17.3537 16.6634C17.5489 16.8588 17.5487 17.1754 17.3534 17.3705C17.158 17.5657 16.8414 17.5655 16.6463 17.3702L12.925 13.6452C12.7298 13.4499 12.73 13.1333 12.9254 12.9381Z" fill="currentColor"/>
                </svg>
                <span className={styles.iconLabel}>검색</span>
              </span>
            </button>
            <form
              className={`${styles.searchForm} ${isSearchOpen ? styles.searchFormOpen : ""}`}
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
              role="search"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="검색어를 입력해 주세요."
                className={styles.searchInput}
                maxLength={25}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                  if (!e.target.value.trim()) resetSearchResults();
                }}
                onKeyDown={handleSearchKeyDown}
              />
              <button
                type="button"
                className={styles.searchClose}
                onClick={closeSearch}
                aria-label="검색 닫기"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>
            </form>

            {/* 실시간 추천 드롭다운 — searchForm은 overflow:hidden(클립패스 전개)이라 형제로 배치.
                결과가 없어도 loading/error/빈 결과 상태를 구분해 보여주기 위해 hasQuery 기준으로 유지 */}
            {hasQuery && searchStatus !== "idle" && optionCount === 0 && (
              <div className={styles.searchDropdown}>
                <p className={styles.searchStatus} role="status">
                  {searchStatus === "loading" && "검색 중이에요…"}
                  {searchStatus === "error" &&
                    "추천 검색어를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."}
                  {searchStatus === "done" && (
                    <>
                      &lsquo;<strong>{query.trim()}</strong>&rsquo;에 대한 검색 결과가 없어요.
                    </>
                  )}
                </p>
              </div>
            )}
            {optionCount > 0 && (
              <ul className={styles.searchDropdown} role="listbox" aria-label="검색 추천">
                {/* 연관 분류명 (탐색형) */}
                {keywords.map((keyword, i) => (
                  <li key={`kw-${keyword}`} role="option" aria-selected={i === activeIndex}>
                    <button
                      type="button"
                      className={`${styles.keywordItem} ${i === activeIndex ? styles.suggestionActive : ""}`}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => searchByKeyword(keyword)}
                    >
                      <HighlightedName name={keyword} query={query} />
                    </button>
                  </li>
                ))}
                {keywords.length > 0 && suggestions.length > 0 && (
                  <li aria-hidden="true" className={styles.suggestionDivider} />
                )}
                {/* 상품 다이렉트 히트 (목적형) */}
                {suggestions.map((p, i) => (
                  <li key={p.id} role="option" aria-selected={keywords.length + i === activeIndex}>
                    <Link
                      href={`/products/${p.id}`}
                      className={`${styles.suggestionItem} ${keywords.length + i === activeIndex ? styles.suggestionActive : ""}`}
                      onMouseEnter={() => setActiveIndex(keywords.length + i)}
                    >
                      <HighlightedName name={p.name} query={query} />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/search?q=${encodeURIComponent(query.trim())}`}
                    className={styles.suggestionAll}
                  >
                    &lsquo;<strong>{query.trim()}</strong>&rsquo; 전체 결과 보기
                  </Link>
                </li>
              </ul>
            )}

            {/* 빈 입력 상태: 최근 검색어 (localStorage) */}
            {isSearchOpen && !query.trim() && recent.length > 0 && (
              <div className={styles.searchDropdown}>
                <div className={styles.recentHeader}>
                  <span>최근 검색어</span>
                  <button
                    type="button"
                    className={styles.recentClear}
                    onClick={() => saveRecent([])}
                  >
                    초기화
                  </button>
                </div>
                <ul>
                  {recent.map((keyword) => (
                    <li key={keyword} className={styles.recentItem}>
                      <button
                        type="button"
                        className={styles.recentKeyword}
                        onClick={() => {
                          addRecent(keyword);
                          router.push(`/search?q=${encodeURIComponent(keyword)}`);
                        }}
                      >
                        {keyword}
                      </button>
                      <button
                        type="button"
                        className={styles.recentRemove}
                        onClick={() => removeRecent(keyword)}
                        aria-label={`'${keyword}' 검색 기록 삭제`}
                      >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 매장찾기 (≤768에서 숨김 — 드로어 유틸리티로 대체) */}
          <button className={`${styles.iconBtn} ${styles.storeBtn}`} aria-label="매장찾기">
            <span className={styles.iconWrap}>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 8.2C15 5.31249 12.7018 3 9.90154 3C7.14338 3 5 5.26867 5 8.2C5 9.40561 5.40103 10.5114 6.07283 11.3914L6.07398 11.3929L9.91794 16.3827L13.9331 11.3837C14.6013 10.505 15 9.40209 15 8.2ZM14.7206 12L10.2996 17.5044C10.0968 17.7569 9.71124 17.753 9.51364 17.4965L5.27935 12C4.47746 10.9504 4 9.6319 4 8.2C4 4.77583 6.53346 2 9.90154 2C13.2696 2 16 4.77583 16 8.2C16 9.6319 15.5225 10.9504 14.7206 12Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10 9.5C10.8284 9.5 11.5 8.82843 11.5 8C11.5 7.17157 10.8284 6.5 10 6.5C9.17157 6.5 8.5 7.17157 8.5 8C8.5 8.82843 9.17157 9.5 10 9.5ZM10 10.5C11.3807 10.5 12.5 9.38071 12.5 8C12.5 6.61929 11.3807 5.5 10 5.5C8.61929 5.5 7.5 6.61929 7.5 8C7.5 9.38071 8.61929 10.5 10 10.5Z" fill="currentColor"/>
              </svg>
              <span className={styles.iconLabel}>매장찾기</span>
            </span>
          </button>

          {/* 장바구니 */}
          <Link href="/cart" className={styles.iconBtn} aria-label="장바구니">
            <span className={styles.iconWrap}>
              <span className={styles.iconSvgWrap}>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.3884 7H5.61133L4.15596 17L15.8438 17L14.3884 7ZM14.3884 6C14.8851 6 15.3065 6.3645 15.378 6.85598L16.8334 16.856C16.9212 17.4592 16.4534 18 15.8438 18H4.15596C3.54635 18 3.07859 17.4592 3.16638 16.856L4.62176 6.85598C4.69329 6.3645 5.11468 6 5.61133 6H14.3884Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.99988 4.86267V6H6.99988V4.86267C6.99988 3.2801 8.34392 2 9.99988 2C11.6584 2 12.9999 3.28252 12.9999 4.86267V6H11.9999V4.86267C11.9999 3.8779 11.1502 3 9.99988 3C8.85097 3 7.99988 3.87656 7.99988 4.86267Z" fill="currentColor"/>
                </svg>
                {cartCount > 0 && (
                  <span className={styles.cartBadge} aria-label={`장바구니 ${cartCount}개`}>
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </span>
              <span className={styles.iconLabel}>장바구니</span>
            </span>
          </Link>

          {/* 로그인 / 마이페이지 토글 */}
          <button
            className={styles.iconBtn}
            onClick={() => setIsLoggedIn((prev) => !prev)}
            aria-label={isLoggedIn ? "마이페이지" : "로그인"}
          >
            <span className={styles.iconWrap}>
              {isLoggedIn ? (
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 13C2 12.4477 2.44772 12 3 12H17C17.5523 12 18 12.4477 18 13V17.5C18 17.7761 17.7761 18 17.5 18C17.2239 18 17 17.7761 17 17.5V13H3V17.5C3 17.7761 2.77614 18 2.5 18C2.22386 18 2 17.7761 2 17.5V13Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9ZM10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3V17C18 17.5523 17.5523 18 17 18H7C6.44772 18 6 17.5523 6 17V14.2188C6 13.9426 6.22386 13.7188 6.5 13.7188C6.77614 13.7188 7 13.9426 7 14.2188V17L17 17V3L7 3V5.3125C7 5.58864 6.77614 5.8125 6.5 5.8125C6.22386 5.8125 6 5.58864 6 5.3125V3Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.64645 6.64645C9.84171 6.45118 10.1583 6.45118 10.3536 6.64645L13.3536 9.64645C13.5488 9.84171 13.5488 10.1583 13.3536 10.3536L10.3536 13.3536C10.1583 13.5488 9.84171 13.5488 9.64645 13.3536C9.45118 13.1583 9.45118 12.8417 9.64645 12.6464L12.2929 10L9.64645 7.35355C9.45118 7.15829 9.45118 6.84171 9.64645 6.64645Z" fill="currentColor"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10C12.5 10.2761 12.2761 10.5 12 10.5H3C2.72386 10.5 2.5 10.2761 2.5 10C2.5 9.72386 2.72386 9.5 3 9.5H12C12.2761 9.5 12.5 9.72386 12.5 10Z" fill="currentColor"/>
                </svg>
              )}
              <span className={styles.iconLabel}>{isLoggedIn ? "마이" : "로그인"}</span>
            </span>
          </button>

          {/* 햄버거 (모바일 전용, CSS로 노출 제어 — 우측 끝 배치) */}
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setIsMenuOpen(true)}
            aria-label="전체 메뉴 열기"
          >
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <HeaderDrawer open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
