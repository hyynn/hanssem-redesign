"use client";

import { useState } from "react";
import styles from "./CategoryTabs.module.css";

export interface CategoryTab {
  id: string;
  label: string;
  href?: string;
}

interface Props {
  tabs: CategoryTab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export default function CategoryTabs({ tabs, defaultTab, onTabChange }: Props) {
  const [activeId, setActiveId] = useState(defaultTab ?? tabs[0]?.id ?? "");

  function handleClick(tab: CategoryTab) {
    setActiveId(tab.id);
    onTabChange?.(tab.id);
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav} role="tablist" aria-label="카테고리 탭">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === activeId}
            className={`${styles.tab} ${tab.id === activeId ? styles.active : ""}`}
            onClick={() => handleClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
