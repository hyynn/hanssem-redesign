"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProductSummary } from "../../lib/types";
import { ArrowIcon } from "@/app/components/Icon";
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
          <ArrowIcon direction="left" size={24} />
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
                {sibling.discountRate > 0 && (
                  <span className={styles.discount}>{sibling.discountRate}%</span>
                )}
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
          <ArrowIcon direction="right" size={24} />
        </button>
      </div>
    </div>
  );
}
