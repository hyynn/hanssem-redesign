"use client";

import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";
import type { FilterDimensionDef, FilterDimensionKey } from "@/lib/filter-dimensions";
import { COLOR_GROUP_HEX } from "@/lib/filter-dimensions";
import { ArrowIcon } from "@/app/components/Icon";
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

const IconDown = () => <ArrowIcon direction="down" size={16} aria-hidden />;
const IconUp   = () => <ArrowIcon direction="up"   size={16} aria-hidden />;

function ColorSwatch({ name, size = 14 }: { name: string; size?: number }) {
  const hex = COLOR_GROUP_HEX[name] ?? "#ccc";
  const needsBorder = hex === "#ffffff" || hex === "#faf6f0";
  return (
    <span
      className={styles.colorSwatch}
      style={{
        background: hex,
        width: size,
        height: size,
        boxShadow: needsBorder ? "inset 0 0 0 1px #d0d0d0" : undefined,
      }}
      aria-hidden="true"
    />
  );
}

function optionLabel(dimensionKey: FilterDimensionKey, opt: string): string {
  return dimensionKey === "color" ? opt : opt;
}

function Dropdown({
  dimensionKey,
  label,
  options,
  value,
  active,
  onChange,
}: {
  dimensionKey: FilterDimensionKey;
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
        {open ? <IconUp /> : <IconDown />}
      </button>
      {open && (
        <ul className={styles.dropdownMenu} role="listbox">
          {options.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`${styles.dropdownItem} ${value === opt ? styles.dropdownItemSelected : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {dimensionKey === "color" && <ColorSwatch name={opt} />}
              {optionLabel(dimensionKey, opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SortDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
      <button className={styles.sortTrigger} onClick={() => setOpen((v) => !v)} type="button">
        {currentLabel}
        {open ? <IconUp /> : <IconDown />}
      </button>
      {open && (
        <ul className={`${styles.dropdownMenu} ${styles.dropdownMenuRight}`} role="listbox">
          {SORT_OPTIONS.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`${styles.dropdownItem} ${value === opt.value ? styles.dropdownItemSelected : ""}`}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AllFiltersPanel({
  dimensions,
  filters,
  onChange,
  onClearAll,
  onClose,
}: {
  dimensions: FilterDimensionDef[];
  filters: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const hasActive = Object.keys(filters).length > 0;

  return createPortal(
    <div className={styles.panelBackdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>전체 필터</span>
          <button className={styles.panelClose} onClick={onClose} type="button" aria-label="닫기">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>

        <div className={styles.panelBody}>
          {dimensions.map((dim) => (
            <div key={dim.key} className={styles.panelSection}>
              <p className={styles.panelSectionLabel}>{dim.label}</p>
              <div className={styles.panelChips}>
                {dim.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.panelChip} ${filters[dim.key] === opt ? styles.panelChipActive : ""}`}
                    onClick={() => onChange(dim.key, opt)}
                  >
                    {dim.key === "color" && <ColorSwatch name={opt} size={12} />}
                    {optionLabel(dim.key, opt)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.panelFooter}>
          <button
            className={styles.panelClear}
            type="button"
            onClick={onClearAll}
            disabled={!hasActive}
          >
            초기화
          </button>
          <button className={styles.panelApply} type="button" onClick={onClose}>
            적용
          </button>
        </div>
      </div>
    </div>,
    document.body
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
  const [panelOpen, setPanelOpen] = useState(false);
  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className={styles.bar}>
      <span className={styles.count}>전체 {productCount}건</span>
      <div className={styles.controls}>
        {/* 전체 필터 버튼 */}
        <button
          type="button"
          className={`${styles.allFiltersBtn} ${hasActiveFilters ? styles.allFiltersBtnActive : ""}`}
          onClick={() => setPanelOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor" aria-hidden="true">
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
          필터
          {hasActiveFilters && <span className={styles.allFiltersBadge}>{Object.keys(filters).length}</span>}
        </button>

        <span className={styles.divider} />

        {dimensions.map((dim) => (
          <Dropdown
            key={dim.key}
            dimensionKey={dim.key}
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

      {panelOpen && (
        <AllFiltersPanel
          dimensions={dimensions}
          filters={filters}
          onChange={onChange}
          onClearAll={onClearAll}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  );
}
