"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProductSummary } from "../../lib/types";
import styles from "./ProductVariantPicker.module.css";

interface Props {
  title?: string;
  siblings: ProductSummary[];
  selectedId: string;
}

export default function ProductVariantPicker({
  title = "다른 구성 보기",
  siblings,
  selectedId,
}: Props) {
  const others = siblings.filter((s) => s.id !== selectedId);
  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState<boolean | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const checkEdges = () => {
    const el = listRef.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth + 1);
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(checkEdges);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  if (others.length === 0) return null;

  const arrowsVisible = canScroll === true;

  const scroll = (dir: "left" | "right") => {
    listRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <div className={styles.scrollWrapper} ref={wrapperRef}>
        <button
          className={`${styles.arrowBtn} ${!arrowsVisible ? styles.arrowHidden : atStart ? styles.arrowDisabled : ""}`}
          onClick={() => scroll("left")}
          aria-label="이전 옵션"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="m388.87-480 300.46 300.46q14.97 15.35 15.09 37.73.12 22.38-15.42 38.58-16.01 15.64-38.39 15.64t-38.02-15.64l-315.02-314.7q-13.21-13.2-19.38-29.3-6.18-16.1-6.18-32.77t6.18-32.77q6.17-16.1 19.38-29.3L613.26-857.2q15.64-16.02 37.57-15.89 21.92.12 38.5 16.32 14.97 16.02 15.31 38.15.33 22.14-15.31 38.16L388.87-480Z" />
          </svg>
        </button>

        <div className={styles.list} ref={listRef} onScroll={checkEdges}>
          {others.map((sibling) => (
            <Link
              key={sibling.id}
              href={`/products/${sibling.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={sibling.thumbnail}
                  alt={sibling.variantLabel ?? sibling.name}
                />
              </div>
              <p className={styles.label}>{sibling.variantLabel ?? sibling.name}</p>
              <div className={styles.priceRow}>
                <span className={styles.discount}>{sibling.discountRate}%</span>
                <span className={styles.price}>
                  {sibling.price.toLocaleString()}원
                </span>
              </div>
            </Link>
          ))}
        </div>

        <button
          className={`${styles.arrowBtn} ${!arrowsVisible ? styles.arrowHidden : atEnd ? styles.arrowDisabled : ""}`}
          onClick={() => scroll("right")}
          aria-label="다음 옵션"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M571.93-481.33 271.46-781.8q-15.34-15.35-15.46-37.61-.12-22.26 15.23-37.89 16.02-16.02 38.56-16.02 22.54 0 38.18 16.02l314.7 313.89q13.2 13.21 19.37 29.31 6.18 16.1 6.18 32.77 0 16.66-6.18 32.76-6.17 16.11-19.37 29.31L347.54-104.13q-16.02 16.01-37.87 15.51-21.86-.5-37.87-16.51-15.35-16.01-15.68-38.04-.34-22.02 15.68-38.03l300.13-300.13Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
