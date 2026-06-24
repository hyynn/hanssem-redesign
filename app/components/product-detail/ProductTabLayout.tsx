"use client";

import { useState, useRef } from "react";
import ProductDetailTabs from "./ProductDetailTabs";
import ProductDetailSection from "./ProductDetailSection";
import PrePurchaseNotice from "./PrePurchaseNotice";
import ReviewSection from "./ReviewSection";
import QnaSection from "./QnaSection";
import DeliverySection from "./DeliverySection";
import styles from "./ProductTabLayout.module.css";
import { ProductDetail } from "./types";

const MAIN_TABS = [
  { id: "info", label: "상품정보" },
  { id: "review", label: "후기" },
  { id: "qna", label: "문의" },
  { id: "delivery", label: "배송정보" },
] as const;

type TabId = (typeof MAIN_TABS)[number]["id"];

export default function ProductTabLayout({ product }: { product: ProductDetail }) {
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
              <span className={styles.tabCount}>({product.reviews.count})</span>
            )}
            {tab.id === "qna" && (
              <span className={styles.tabCount}>({product.qnaItems.length})</span>
            )}
          </button>
        ))}
      </nav>

      {/* key를 activeTab으로 주면 탭 전환 시 div가 재마운트되어 animation이 재실행됨 */}
      <div key={activeTab} className={styles.panel}>
        {activeTab === "info" && (
          <>
            <ProductDetailTabs sections={product.sections} />
            {product.sections.map((section) => (
              <ProductDetailSection key={section.id} section={section} />
            ))}
            <PrePurchaseNotice />
          </>
        )}
        {activeTab === "review" && <ReviewSection data={product.reviews} />}
        {activeTab === "qna" && <QnaSection items={product.qnaItems} />}
        {activeTab === "delivery" && <DeliverySection guides={product.deliveryGuides} />}
      </div>
    </div>
  );
}
