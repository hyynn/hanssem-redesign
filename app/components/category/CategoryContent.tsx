"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { ProductSummary } from "@/app/lib/types";
import { ALL_FILTER_AXES, FILTER_AXES_BY_CATEGORY, buildDimensions, COLOR_GROUPS } from "@/lib/filter-dimensions";
import ProductCard from "@/app/components/ProductCard";
import SubcategoryBanner from "./SubcategoryBanner";
import ProductFilterBar from "./ProductFilterBar";
import styles from "./CategoryContent.module.css";

export interface SubcategoryConfig {
  id: string;
  label: string;
  categoryName: string;
  categoryCode?: string;
  banner: { image: string; title: string; body: string };
}

export interface TabConfig {
  id: string;
  label: string;
  subcategories: SubcategoryConfig[];
}

interface Props {
  tabs: TabConfig[];
  allProducts: ProductSummary[];
  initialTab?: string;
  initialSubcat?: string;
  children?: React.ReactNode;
}

const MAIN_TAB_ID = "main";
const ALL_SUBCAT_ID = "all";

function resolveInitialTab(tabs: TabConfig[], initialTab?: string) {
  if (initialTab === MAIN_TAB_ID) return MAIN_TAB_ID;
  if (initialTab && tabs.some((t) => t.id === initialTab)) return initialTab;
  return MAIN_TAB_ID;
}

function resolveInitialSubcat(tabs: TabConfig[], tabId: string, initialSubcat?: string) {
  const tab = tabs.find((t) => t.id === tabId);
  if (!tab) return ALL_SUBCAT_ID;
  if (initialSubcat === ALL_SUBCAT_ID) return ALL_SUBCAT_ID;
  if (initialSubcat && tab.subcategories.some((s) => s.id === initialSubcat)) return initialSubcat;
  return ALL_SUBCAT_ID;
}

export default function CategoryContent({ tabs, allProducts, initialTab, initialSubcat, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const resolvedTab = resolveInitialTab(tabs, initialTab);
  const resolvedSubcat = resolveInitialSubcat(tabs, resolvedTab, initialSubcat);

  const [activeTabId, setActiveTabId] = useState(resolvedTab);
  const [activeSubcatId, setActiveSubcatId] = useState(resolvedSubcat);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState("popular");

  const isMain = activeTabId === MAIN_TAB_ID;
  const isAllSubcat = !isMain && activeSubcatId === ALL_SUBCAT_ID;
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeSubcat = isAllSubcat
    ? undefined
    : activeTab?.subcategories.find((s) => s.id === activeSubcatId) ?? activeTab?.subcategories[0];

  function updateUrl(tabId: string, subcatId: string) {
    const params = new URLSearchParams();
    if (tabId !== MAIN_TAB_ID) {
      params.set("tab", tabId);
      if (subcatId !== ALL_SUBCAT_ID) params.set("subcat", subcatId);
    }
    const query = params.toString();
    router.replace(pathname + (query ? `?${query}` : ""), { scroll: false });
  }

  function handleTabChange(tabId: string) {
    setActiveTabId(tabId);
    if (tabId !== MAIN_TAB_ID) setActiveSubcatId(ALL_SUBCAT_ID);
    setFilters({});
    setSort("popular");
    updateUrl(tabId, ALL_SUBCAT_ID);
  }

  function handleSubcatChange(subcatId: string) {
    setActiveSubcatId(subcatId);
    setFilters({});
    updateUrl(activeTabId, subcatId);
  }

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => {
      if (prev[key] === value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  }

  const categoryName = activeSubcat?.categoryName ?? "";
  const categoryCode = activeSubcat?.categoryCode;

  // 카테고리만 필터링 (filters 미적용) — dimension 옵션 계산 기준
  const categoryProducts = isMain ? []
    : isAllSubcat
      ? allProducts.filter((p) =>
          activeTab!.subcategories.some((sub) =>
            p.category.includes(sub.categoryName) || p.categoryTags?.includes(sub.categoryName)
          )
        )
      : allProducts.filter((p) =>
          p.category.includes(categoryName) || p.categoryTags?.includes(categoryName)
        );

  const filtered = categoryProducts.filter((p) => {
    for (const [key, value] of Object.entries(filters)) {
      if (key === "color") {
        const groups = p.colors?.map((c) => COLOR_GROUPS[c]).filter(Boolean) ?? [];
        if (!groups.includes(value)) return false;
      } else {
        const attr = p.filterAttributes?.[key as keyof typeof p.filterAttributes];
        if (!attr || !attr.includes(value)) return false;
      }
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
    return b.rating - a.rating;
  });

  const axes = categoryCode
    ? (FILTER_AXES_BY_CATEGORY[categoryCode] ?? ALL_FILTER_AXES)
    : ALL_FILTER_AXES;
  const dimensions = buildDimensions(axes, categoryProducts);

  const allNavTabs = [{ id: MAIN_TAB_ID, label: "메인" }, ...tabs.map((t) => ({ id: t.id, label: t.label }))];

  return (
    <>
      {/* 단일 sticky 래퍼: tabNav + chips */}
      <div className={styles.stickyBars}>
        <div className={styles.tabNav}>
          <nav className={styles.nav} role="tablist" aria-label="카테고리 탭">
            {allNavTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={tab.id === activeTabId}
                className={`${styles.tab} ${tab.id === activeTabId ? styles.tabActive : ""}`}
                onClick={() => handleTabChange(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {!isMain && activeTab && (
          <div className={styles.chips}>
            <button
              type="button"
              className={`${styles.chip} ${isAllSubcat ? styles.chipActive : ""}`}
              onClick={() => handleSubcatChange(ALL_SUBCAT_ID)}
            >
              전체
            </button>
            {activeTab.subcategories.map((sub) => (
              <button
                key={sub.id}
                type="button"
                className={`${styles.chip} ${sub.id === activeSubcatId ? styles.chipActive : ""}`}
                onClick={() => handleSubcatChange(sub.id)}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 메인 탭 콘텐츠 */}
      {isMain && children}

      {/* 카테고리 탭 콘텐츠 */}
      {!isMain && (
        <>
          {activeSubcat && (
            <SubcategoryBanner
              image={activeSubcat.banner.image}
              title={activeSubcat.banner.title}
              body={activeSubcat.banner.body}
            />
          )}

          <ProductFilterBar
            dimensions={dimensions}
            filters={filters}
            onChange={handleFilterChange}
            onClearAll={() => setFilters({})}
            productCount={sorted.length}
            sort={sort}
            onSortChange={setSort}
          />

          <div className={styles.gridWrapper}>
            {sorted.length > 0 ? (
              <div className={styles.grid}>
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>해당 조건에 맞는 상품이 없습니다.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
