"use client";

import { useState } from "react";
import type { ProductSummary } from "@/app/lib/types";
import { getFilterDimensions } from "@/lib/filter-dimensions";
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
  defaultSubcatId?: string;
  subcategories: SubcategoryConfig[];
}

interface Props {
  tabs: TabConfig[];
  allProducts: ProductSummary[];
  children?: React.ReactNode;
}

const MAIN_TAB_ID = "main";

export default function CategoryContent({ tabs, allProducts, children }: Props) {
  const [activeTabId, setActiveTabId] = useState(MAIN_TAB_ID);
  const [activeSubcatId, setActiveSubcatId] = useState(
    tabs[0]?.defaultSubcatId ?? tabs[0]?.subcategories[0]?.id ?? ""
  );
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState("popular");

  const isMain = activeTabId === MAIN_TAB_ID;
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeSubcat =
    activeTab?.subcategories.find((s) => s.id === activeSubcatId) ??
    activeTab?.subcategories[0];

  function handleTabChange(tabId: string) {
    setActiveTabId(tabId);
    if (tabId !== MAIN_TAB_ID) {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab) setActiveSubcatId(tab.defaultSubcatId ?? tab.subcategories[0]?.id ?? "");
    }
    setFilters({});
    setSort("popular");
  }

  function handleSubcatChange(subcatId: string) {
    setActiveSubcatId(subcatId);
    setFilters({});
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

  const filtered = isMain ? [] : allProducts.filter((p) => {
    const inCategory =
      p.category.includes(categoryName) || p.categoryTags?.includes(categoryName);
    if (!inCategory) return false;
    for (const [key, value] of Object.entries(filters)) {
      const attr = p.filterAttributes?.[key as keyof typeof p.filterAttributes];
      if (!attr || !attr.includes(value)) return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (b.reviewCount !== a.reviewCount) return b.reviewCount - a.reviewCount;
    return b.rating - a.rating;
  });

  const { dimensions } = categoryCode
    ? getFilterDimensions(categoryCode)
    : { dimensions: [] };

  const allNavTabs = [{ id: MAIN_TAB_ID, label: "메인" }, ...tabs.map((t) => ({ id: t.id, label: t.label }))];

  return (
    <>
      {/* Sticky tab nav */}
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

      {/* 메인 탭: 전달받은 sections 렌더 */}
      {isMain && children}

      {/* 카테고리 탭: chips(sticky) + banner + filter + grid */}
      {!isMain && (
        <>
          {activeTab && activeTab.subcategories.length > 1 && (
            <div className={styles.chips}>
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
