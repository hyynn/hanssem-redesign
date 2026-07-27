"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { CATEGORY_CONFIG, CATEGORY_SLUGS } from "@/app/components/category/categoryConfig";
import styles from "./HeaderDrawer.module.css";

// categoryConfig.ts(CATEGORY_SLUGS)를 단일 소스로 삼아 대분류·중분류(tab=) 링크를
// 파생 — Header의 데스크톱 nav·메가메뉴도 같은 소스를 쓰므로, 카테고리 구성이
// 바뀌어도 categoryConfig.ts 한 곳만 고치면 모바일 드로어까지 자동으로 맞춰짐.
// 이벤트/매거진처럼 카테고리가 아닌 링크만 아래에 수동으로 이어붙인다.
const DRAWER_MENU: {
  label: string;
  href: string;
  prefetch?: false;
  children?: { label: string; href: string }[];
}[] = [
  ...CATEGORY_SLUGS.map((slug) => {
    const config = CATEGORY_CONFIG[slug];
    return {
      label: config.mainCategory,
      href: `/category/${slug}`,
      // 소품(home-deco)만 prefetch 비활성 — 기존 설정 유지
      ...(slug === "home-deco" ? { prefetch: false as const } : {}),
      children: config.tabs.map((tab) => ({
        label: tab.label,
        href: `/category/${slug}?tab=${tab.id}`,
      })),
    };
  }),
  { label: "이벤트", href: "/events", prefetch: false },
  { label: "매거진", href: "/magazine", prefetch: false },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HeaderDrawer({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  // 위 항목이 접히면서 아래 항목들이 화면상으로 밀려 올라갈 때, 커서가 물리적으로
  // 안 움직여도 그 자리에 다른 행이 깔리면 브라우저가 mouseenter를 새로 쏴서
  // hover가 엉뚱한 항목으로 튀는 문제가 있었음. mouseenter 대신 mousemove를 기준으로
  // 삼으면 근본적으로 해결됨 — 레이아웃 변화만으로는 mousemove가 발생하지 않고,
  // 실제 마우스 좌표가 바뀌는 "진짜" 이동에만 이 이벤트가 발생하기 때문
  const lastRealHoverRef = useRef<string | null>(null);

  // 밀려난 자리(예: 다이닝 위)에서 원래 항목(거실)으로 다시 돌아가려고 이동하면,
  // 그 경로 중간에 있는 항목을 스쳐 지나가며 진짜 mousemove가 발생해 즉시 열려버림.
  // hover intent 패턴: mousemove가 감지돼도 바로 펼치지 않고 짧게 대기했다가,
  // 그 사이 커서가 다른 항목으로 옮겨가지 않고 계속 머물러 있을 때만 확정 펼침
  const HOVER_INTENT_DELAY_MS = 150;
  const hoverIntentTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverIntent = () => {
    if (hoverIntentTimer.current) {
      clearTimeout(hoverIntentTimer.current);
      hoverIntentTimer.current = null;
    }
  };

  // 뷰포트 폭만으로는 "PC 창을 좁힌 것"과 "실제 터치 기기"를 구분할 수 없어
  // hover 지원 여부(마우스 포인터)로 판별 — 터치 전용 기기는 클릭 토글만 그대로 유지
  const handleRealHover = (label: string) => {
    if (lastRealHoverRef.current === label) return;
    lastRealHoverRef.current = label;
    clearHoverIntent();
    if (label === expanded) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    hoverIntentTimer.current = setTimeout(() => setExpanded(label), HOVER_INTENT_DELAY_MS);
  };

  const handleRealHoverLeave = (label: string) => {
    if (lastRealHoverRef.current === label) lastRealHoverRef.current = null;
    clearHoverIntent();
  };

  const handleToggleExpand = (label: string, currentlyExpanded: boolean) => {
    setExpanded(currentlyExpanded ? null : label);
  };

  // 드로어는 open=false일 때도 언마운트되지 않고 null만 렌더링하므로, 닫힐 때
  // 대기 중인 hover intent 타이머를 정리하지 않으면 보이지 않는 상태에서 나중에
  // 발동해 다음에 다시 열었을 때 예상치 못한 항목이 펼쳐져 있을 수 있음
  useEffect(() => {
    if (open) return;
    if (hoverIntentTimer.current) {
      clearTimeout(hoverIntentTimer.current);
      hoverIntentTimer.current = null;
    }
  }, [open]);

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

  // 드로어는 ≤1024(햄버거 노출 구간) 전용 — 열어둔 채로 뷰포트가 데스크톱 폭으로
  // 넓어지면(창 리사이즈·회전) nav가 다시 보이므로 드로어도 함께 닫아야 함
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 1025px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
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
                  <div
                    className={styles.menuRow}
                    onMouseMove={item.children ? () => handleRealHover(item.label) : undefined}
                    onMouseLeave={item.children ? () => handleRealHoverLeave(item.label) : undefined}
                  >
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
                        onClick={() => handleToggleExpand(item.label, isExpanded)}
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
                  {item.children && (
                    <div className={`${styles.subListWrap} ${isExpanded ? styles.subListWrapOpen : ""}`}>
                      <ul className={styles.subList}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className={styles.subLink} onClick={onClose}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
