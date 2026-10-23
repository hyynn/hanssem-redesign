"use client";

import { useState, useRef, type ReactNode } from "react";
import styles from "./ProductTabLayout.module.css";

const MAIN_TABS = [
  { id: "info", label: "상품정보" },
  { id: "review", label: "후기" },
  { id: "qna", label: "문의" },
  { id: "delivery", label: "배송정보" },
] as const;

export type TabId = (typeof MAIN_TABS)[number]["id"];

// 탭 전환만 담당하는 클라이언트 셸. 각 패널은 page(서버)가 렌더링해 slot으로 넘기므로
// 상세 섹션·고지·배송 안내처럼 정적인 패널은 서버 컴포넌트로 남고,
// 리뷰(정렬·포토 모달)·문의(필터)만 클라이언트 컴포넌트로 동작
export default function ProductTabLayout({
  panels,
  reviewCount,
  qnaCount,
}: {
  panels: Record<TabId, ReactNode>;
  reviewCount: number;
  qnaCount: number;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: TabId) => {
    if (wrapperRef.current) {
      const absTop = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: absTop - 80, behavior: "instant" });
    }
    setActiveTab(tabId);
  };

  return (
    <div ref={wrapperRef}>
      <nav className={styles.tabNav}>
        {MAIN_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
            {tab.id === "review" && (
              <span className={styles.tabCount}>({reviewCount})</span>
            )}
            {tab.id === "qna" && (
              <span className={styles.tabCount}>({qnaCount})</span>
            )}
          </button>
        ))}
      </nav>

      {/* key를 activeTab으로 주면 탭 전환 시 div가 재마운트되어 animation이 재실행됨 */}
      <div key={activeTab} className={styles.panel}>
        {panels[activeTab]}
      </div>
    </div>
  );
}
