"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_CONFIG } from "@/app/components/category/categoryConfig";
import styles from "./HeaderMegaMenu.module.css";

interface Props {
  slug: string;
}

// nav 링크 하나에 붙는 캐스케이드 플라이아웃: depth1(중분류)이 링크 바로 아래로
// 세로로 펼쳐지고, 그중 하나에 hover하면 depth2(소분류)가 depth1과 같은 높이(top)에서
// 오른쪽으로 펼쳐진다. depth2는 개별 행이 아니라 depth1 패널 자체를 기준으로
// 위치를 잡아 어느 행을 hover하든 depth1·depth2 상단이 항상 nav 링크 하단과 일직선.
// 너비와 마찬가지로 높이도 하드코딩 없이 각 카테고리 자기 콘텐츠(탭 개수)에 맞게
// 자연스럽게 결정됨 — 카테고리마다 패널 크기가 달라도 한 번에 하나만 열리므로 무방.
// 부모 <li>가 hover 상태를 감시하므로 depth2까지 마우스가 이동해도(둘 다 <li>의
// DOM 자손) 중간에 끊기지 않는다.
export default function HeaderMegaMenu({ slug }: Props) {
  const config = CATEGORY_CONFIG[slug as keyof typeof CATEGORY_CONFIG];
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const activeTab = config.tabs.find((t) => t.id === activeTabId);

  return (
    <div className={styles.depth1}>
      <ul>
        {config.tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`/category/${slug}?tab=${tab.id}`}
              className={`${styles.row} ${tab.id === activeTabId ? styles.rowActive : ""}`}
              onMouseEnter={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>

      {activeTab && (
        <div className={styles.depth2}>
          <ul>
            {activeTab.subcategories.map((sub) => (
              <li key={sub.id}>
                <Link
                  href={`/category/${slug}?tab=${activeTab.id}&subcat=${sub.id}`}
                  className={styles.row}
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
