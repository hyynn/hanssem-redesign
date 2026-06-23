"use client";

import { useEffect, useState } from "react";
import { ProductDetailSection } from "./types";
import styles from "./ProductDetailTabs.module.css";

export default function ProductDetailTabs({
  sections,
}: {
  sections: ProductDetailSection[];
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // 화면 중앙을 지날 때 전환
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.tabs}>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`${styles.tab} ${
            section.id === activeId ? styles.tabActive : ""
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
