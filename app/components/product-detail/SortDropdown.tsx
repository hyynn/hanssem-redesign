"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./SortDropdown.module.css";

export type SortOrder = "latest" | "rating-high" | "rating-low";

const OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "rating-high", label: "평점 높은순" },
  { value: "rating-low", label: "평점 낮은순" },
];

interface Props {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentLabel = OPTIONS.find((o) => o.value === value)?.label ?? "";

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLabel}
        <ArrowIcon direction={isOpen ? "up" : "down"} size={20} aria-hidden />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {OPTIONS.map((opt) => (
            <li key={opt.value} role="option" aria-selected={value === opt.value}>
              <button
                className={`${styles.option} ${value === opt.value ? styles.optionActive : ""}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
