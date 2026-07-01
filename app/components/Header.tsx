"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { label: "침실", href: "/category/bedroom" },
  { label: "거실", href: "/category/livingroom" },
  { label: "다이닝", href: "/category/dining" },
  { label: "소품", href: "/category/home-deco", prefetch: false },
  { label: "이벤트", href: "/events", prefetch: false },
  { label: "매거진", href: "/magazine", prefetch: false },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHome);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  const closeSearch = () => setIsSearchOpen(false);

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
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={item.prefetch ?? true}
                  className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.navActive : ""}`}
                >
                  {item.label}
                </Link>
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
              onClick={() => setIsSearchOpen(true)}
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
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="검색어를 입력해 주세요."
                className={styles.searchInput}
                maxLength={25}
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
          </div>

          {/* 매장찾기 */}
          <button className={styles.iconBtn} aria-label="매장찾기">
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
        </div>
      </div>
    </header>
  );
}
