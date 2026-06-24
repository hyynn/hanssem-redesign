"use client";

import { useState } from "react";
import styles from "./QnaSection.module.css";
import { QnaItem, QnaCategory } from "./types";

const CATEGORIES: Array<"전체" | QnaCategory> = ["전체", "상품", "배송", "기타"];

export default function QnaSection({ items }: { items: QnaItem[] }) {
  const [activeCategory, setActiveCategory] = useState<"전체" | QnaCategory>("전체");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = (
    activeCategory === "전체" ? items : items.filter((item) => item.category === activeCategory)
  ).sort((a, b) => b.date.localeCompare(a.date));

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  return (
    <section id="qna" className={styles.section}>
      <h2 className={styles.heading}>
        상품문의 <span>({items.length})</span>
      </h2>

      <div className={styles.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {filtered.map((item) => (
          <li key={item.id} className={styles.item}>
            <button className={styles.question} onClick={() => toggle(item.id)}>
              <div className={styles.questionMain}>
                <div className={styles.questionMeta}>
                  <span
                    className={`${styles.badge} ${
                      item.answered ? styles.badgeAnswered : styles.badgePending
                    }`}
                  >
                    {item.answered ? "답변완료" : "답변대기"}
                  </span>
                  <span className={styles.categoryTag}>{item.category}</span>
                </div>
                <p className={styles.questionText}>{item.question}</p>
                <div className={styles.questionInfo}>
                  <span>{item.questioner}</span>
                  <span>{item.date}</span>
                </div>
              </div>
              <span className={styles.arrow}>
                {expandedId === item.id ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M480-537 296-354l-56-56 240-240 240 240-56 56-184-184Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
                  </svg>
                )}
              </span>
            </button>

            {expandedId === item.id && (
              <div className={styles.answer}>
                {item.answered && item.answer ? (
                  <>
                    <p className={styles.answerLabel}>답변</p>
                    <p className={styles.answerText}>{item.answer}</p>
                    {item.answerDate && (
                      <span className={styles.answerDate}>{item.answerDate}</span>
                    )}
                  </>
                ) : (
                  <p className={styles.answerPending}>아직 답변이 등록되지 않았습니다.</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
