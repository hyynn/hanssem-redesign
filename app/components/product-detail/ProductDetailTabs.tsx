"use client";

import { useEffect, useState } from "react";
import styles from "./ProductDetailTabs.module.css";

export default function ProductDetailTabs({
  sections,
}: {
  sections: { id: string; label: string }[]; // 앵커 내비에 필요한 값만 — 섹션 본문(blocks)은 직렬화하지 않음
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
