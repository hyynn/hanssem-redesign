"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { ArrowIcon, WishlistBtn } from "@/app/components/Icon";
import styles from "./OrderArea.module.css";

interface Props {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  variantLabel?: string;
  colors?: string[];
}

type SelectedItem = { optionKey: string; qty: number };

export default function OrderArea({
  productId,
  name,
  thumbnail,
  price,
  originalPrice,
  variantLabel,
  colors,
}: Props) {
  const router = useRouter();
  const cartAdd = useCartStore((s) => s.add);

  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(1);                          // 단일(색상 없는) 상품용
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]); // 색상 상품용

  const hasColors = !!colors && colors.length > 0;
  const slotVisible = !hasColors ? isOpen : selectedItems.length > 0;
  const ctaActive = slotVisible;

  const total = !hasColors
    ? price * qty
    : selectedItems.reduce((sum, i) => sum + price * i.qty, 0);

  // ── 토글 ──────────────────────────────────────────────────────────────────
  function handleToggle() {
    if (!hasColors) {
      if (isOpen) { setIsOpen(false); setQty(1); }
      else         { setIsOpen(true); }
    } else {
      setIsOpen((v) => !v);
    }
  }

  // ── 단일 상품 슬롯 닫기 ──────────────────────────────────────────────────
  function handleSlotClose() {
    setIsOpen(false);
    setQty(1);
  }

  // ── 색상 선택 ─────────────────────────────────────────────────────────────
  function selectColor(hex: string) {
    if (!selectedItems.some((i) => i.optionKey === hex)) {
      setSelectedItems((prev) => [...prev, { optionKey: hex, qty: 1 }]);
    }
    setIsOpen(false);
  }

  function removeItem(optionKey: string) {
    setSelectedItems((prev) => prev.filter((i) => i.optionKey !== optionKey));
  }

  function updateItemQty(optionKey: string, newQty: number) {
    setSelectedItems((prev) =>
      prev.map((i) => (i.optionKey === optionKey ? { ...i, qty: newQty } : i))
    );
  }

  // ── 장바구니 ──────────────────────────────────────────────────────────────
  function handleAddToCart() {
    if (!hasColors) {
      cartAdd({ productId, name, thumbnail, price, originalPrice, optionLabel: variantLabel }, qty);
    } else {
      selectedItems.forEach((item) => {
        const optionLabel = item.optionKey;
        cartAdd({ productId, name, thumbnail, price, originalPrice, optionLabel }, item.qty);
      });
    }
    setIsOpen(false);
    setQty(1);
    setSelectedItems([]);
  }

  // ── 바로구매 ──────────────────────────────────────────────────────────────
  function handleBuyNow() {
    const checkoutItems = !hasColors
      ? [{ productId, name, thumbnail, price, originalPrice, quantity: qty, optionLabel: variantLabel }]
      : selectedItems.map((item) => ({
          productId,
          name,
          thumbnail,
          price,
          originalPrice,
          quantity: item.qty,
          optionLabel: item.optionKey,
        }));
    sessionStorage.setItem("hanssem-checkout", JSON.stringify(checkoutItems));
    router.push("/checkout");
  }

  // ── 색상 옵션 라벨 헬퍼 ───────────────────────────────────────────────────
  function colorLabel(name: string) {
    return name;
  }

  const alreadySelectedKeys = new Set(selectedItems.map((i) => i.optionKey));

  return (
    <div className={styles.area}>
      {/* ── 드롭다운 토글 — 항상 존재 ─────────────────────────────────── */}
      <div className={styles.toggleWrapper}>
        <button
          type="button"
          className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ""}`}
          onClick={handleToggle}
          aria-expanded={isOpen}
        >
          <span className={styles.toggleLabel}>기본 상품 선택</span>
          <ArrowIcon direction={isOpen ? "up" : "down"} size={24} aria-hidden />
        </button>

        {/* 색상 옵션 목록 — 절대 위치로 겹쳐 표시 */}
        {isOpen && hasColors && (
          <ul className={styles.colorOptionList} role="listbox" aria-label="색상 선택">
            {colors!.map((hex) => {
              const disabled = alreadySelectedKeys.has(hex);
              return (
                <li key={hex} role="option" aria-selected={disabled}>
                  <button
                    type="button"
                    className={`${styles.colorOption} ${disabled ? styles.colorOptionDisabled : ""}`}
                    onClick={() => !disabled && selectColor(hex)}
                    disabled={disabled}
                  >
                    {colorLabel(hex)}
                    {disabled && <span className={styles.colorOptionBadge}>선택됨</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* ── 선택 슬롯 ─────────────────────────────────────────────────── */}
      {slotVisible && (
        <div className={styles.slotList}>
          {/* 색상 없는 단일 상품 */}
          {!hasColors && (
            <div className={styles.slot}>
              <div className={styles.slotTop}>
                <div className={styles.slotNames}>
                  <span className={styles.slotName}>{name}</span>
                  {variantLabel && (
                    <span className={styles.slotVariant}>ㄴ {variantLabel}</span>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.slotClose}
                  onClick={handleSlotClose}
                  aria-label="선택 취소"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className={styles.slotBottom}>
                <div className={styles.stepper}>
                  <button type="button" className={styles.stepBtn} onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="수량 줄이기">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-440v-80h560v80H200Z" /></svg>
                  </button>
                  <span className={styles.stepCount}>{qty}</span>
                  <button type="button" className={styles.stepBtn} onClick={() => setQty((q) => q + 1)} aria-label="수량 늘리기">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                  </button>
                </div>
                <span className={styles.slotSubtotal}>{(price * qty).toLocaleString()}원</span>
              </div>
            </div>
          )}

          {/* 색상 선택된 슬롯들 */}
          {hasColors && selectedItems.map((item) => (
            <div key={item.optionKey} className={styles.slot}>
              <div className={styles.slotTop}>
                <div className={styles.slotNames}>
                  <span className={styles.slotName}>{name}</span>
                  <span className={styles.slotVariant}>ㄴ {colorLabel(item.optionKey)}</span>
                </div>
                <button
                  type="button"
                  className={styles.slotClose}
                  onClick={() => removeItem(item.optionKey)}
                  aria-label="선택 취소"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
              </div>
              <div className={styles.slotBottom}>
                <div className={styles.stepper}>
                  <button type="button" className={styles.stepBtn} onClick={() => updateItemQty(item.optionKey, Math.max(1, item.qty - 1))} disabled={item.qty <= 1} aria-label="수량 줄이기">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M200-440v-80h560v80H200Z" /></svg>
                  </button>
                  <span className={styles.stepCount}>{item.qty}</span>
                  <button type="button" className={styles.stepBtn} onClick={() => updateItemQty(item.optionKey, item.qty + 1)} aria-label="수량 늘리기">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                  </button>
                </div>
                <span className={styles.slotSubtotal}>{(price * item.qty).toLocaleString()}원</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 총 구매가 ──────────────────────────────────────────────────── */}
      {ctaActive && (
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>총 구매가</span>
          <span className={styles.totalPrice}>{total.toLocaleString()} 원</span>
        </div>
      )}

      {/* ── 쿠폰 안내 ─────────────────────────────────────────────────── */}
      <p className={styles.couponNote}>
        ❋ 쿠폰적용 및 패키지할인 적용금액은 장바구니/주문서 작성 시 적용됩니다.
      </p>

      {/* ── CTA 버튼 행 ───────────────────────────────────────────────── */}
      <div className={`${styles.ctaRow} ${ctaActive ? styles.ctaOpen : ""}`}>
        <button
          type="button"
          className={styles.cartBtn}
          onClick={ctaActive ? handleAddToCart : undefined}
        >
          장바구니
        </button>
        <button
          type="button"
          className={styles.buyBtn}
          onClick={ctaActive ? handleBuyNow : undefined}
        >
          바로구매
        </button>
        <WishlistBtn className={styles.wishBtn} size={24} />
      </div>
    </div>
  );
}
