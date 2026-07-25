"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./HeaderDrawer.module.css";

// 드로어 메뉴: Header의 NAV_ITEMS와 동일한 대분류 + 카테고리 페이지 탭(tab=) 링크.
// 카테고리 탭 구성이 바뀌면 app/category/[slug]/page.tsx의 CATEGORY_CONFIG와 맞출 것
const DRAWER_MENU: {
  label: string;
  href: string;
  prefetch?: false;
  children?: { label: string; href: string }[];
}[] = [
  {
    label: "침실",
    href: "/category/bedroom",
    children: [
      { label: "침대", href: "/category/bedroom?tab=bed" },
      { label: "매트리스", href: "/category/bedroom?tab=mattress" },
      { label: "화장대", href: "/category/bedroom?tab=dresser" },
      { label: "서랍장", href: "/category/bedroom?tab=storage" },
      { label: "협탁", href: "/category/bedroom?tab=nightstand" },
    ],
  },
  {
    label: "거실",
    href: "/category/livingroom",
    children: [
      { label: "소파", href: "/category/livingroom?tab=sofa" },
      { label: "테이블", href: "/category/livingroom?tab=table" },
      { label: "거실장", href: "/category/livingroom?tab=cabinet" },
    ],
  },
  {
    label: "다이닝",
    href: "/category/dining",
    children: [
      { label: "식탁", href: "/category/dining?tab=table" },
      { label: "의자", href: "/category/dining?tab=chair" },
      { label: "주방수납장", href: "/category/dining?tab=kitchen-storage" },
    ],
  },
  { label: "소품", href: "/category/home-deco", prefetch: false },
  { label: "이벤트", href: "/events", prefetch: false },
  { label: "매거진", href: "/magazine", prefetch: false },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HeaderDrawer({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // 스크롤 잠금: overflow hidden 전에 스크롤바 폭 계산 → paddingRight 보정
  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  // Esc로 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // open은 클라이언트 인터랙션으로만 true가 되므로 SSR에서 portal이 그려질 일 없음
  if (!open) return null;

  return createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <aside className={styles.panel} aria-label="전체 메뉴">
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>메뉴</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="메뉴 닫기">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className={styles.menu}>
          <ul>
            {DRAWER_MENU.map((item) => {
              const isExpanded = expanded === item.label;
              return (
                <li key={item.label} className={styles.menuItem}>
                  <div className={styles.menuRow}>
                    <Link
                      href={item.href}
                      prefetch={item.prefetch}
                      className={styles.menuLink}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        className={styles.expandBtn}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        aria-label={`${item.label} 하위 메뉴 ${isExpanded ? "접기" : "펼치기"}`}
                        aria-expanded={isExpanded}
                      >
                        {/* open/closed는 rotate 대신 path 교체로 표현 */}
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {isExpanded ? (
                            <path d="M4 13L10 7L16 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          ) : (
                            <path d="M4 7L10 13L16 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                        </svg>
                      </button>
                    )}
                  </div>
                  {item.children && isExpanded && (
                    <ul className={styles.subList}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.subLink} onClick={onClose}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.utility}>
          <button className={styles.utilityBtn}>매장찾기</button>
          <button className={styles.utilityBtn}>로그인</button>
        </div>
      </aside>
    </>,
    document.body
  );
}
