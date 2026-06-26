"use client";

import { useRef, useEffect, useState } from "react";
import type { FilterDimensionDef } from "@/lib/filter-dimensions";
import styles from "./ProductFilterBar.module.css";

interface Props {
  dimensions: FilterDimensionDef[];
  filters: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClearAll: () => void;
  productCount: number;
  sort: string;
  onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = [
  { value: "popular", label: "인기순" },
  { value: "price-asc", label: "낮은가격순" },
  { value: "price-desc", label: "높은가격순" },
];

function Dropdown({
  label,
  options,
  value,
  active,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  active: boolean;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={`${styles.dropdownTrigger} ${active ? styles.dropdownTriggerActive : ""}`}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {label}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}>▾</span>
      </button>
      {open && (
        <ul className={styles.dropdownMenu} role="listbox">
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`${styles.dropdownItem} ${value === opt ? styles.dropdownItemSelected : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label ?? "인기순";

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        className={styles.sortTrigger}
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {currentLabel}
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ""}`}>▾</span>
      </button>
      {open && (
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenuRight}`} role="listbox">
          {SORT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`${styles.dropdownItem} ${value === opt.value ? styles.dropdownItemSelected : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProductFilterBar({
  dimensions,
  filters,
  onChange,
  onClearAll,
  productCount,
  sort,
  onSortChange,
}: Props) {
  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className={styles.bar}>
      <span className={styles.count}>전체 {productCount}건</span>
      <div className={styles.controls}>
        {dimensions.map((dim) => (
          <Dropdown
            key={dim.key}
            label={dim.label}
            options={dim.options}
            value={filters[dim.key] ?? ""}
            active={!!filters[dim.key]}
            onChange={(v) => onChange(dim.key, v)}
          />
        ))}
        {hasActiveFilters && (
          <button className={styles.clearBtn} onClick={onClearAll} type="button">
            초기화
          </button>
        )}
        <SortDropdown value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
