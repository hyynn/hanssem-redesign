"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/store/cartStore";
import { ArrowIcon, WishlistBtn } from "@/app/components/Icon";
import AddToCartModal, { prefetchRecommendPool } from "./AddToCartModal";
import type { FilterAttributes, ColorOption, PriceOptionGroup } from "@/app/lib/types";
import { colorName, colorPriceDelta } from "@/app/lib/types";
import { formatPrice } from "@/lib/format";
import styles from "./OrderArea.module.css";

interface Props {
  productId: string;
  name: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  variantLabel?: string;
  colors?: ColorOption[];
  priceOptionGroups?: PriceOptionGroup[];
  category: string[];
  filterAttributes?: FilterAttributes;
}

type SelectedItem = {
  optionKey: string;
  color?: ColorOption;
  priceSelections: Record<string, string>; // groupId -> optionId
  qty: number;
};

export default function OrderArea({
  productId,
  name,
  thumbnail,
  price,
  originalPrice,
  variantLabel,
  colors,
  priceOptionGroups,
  category,
  filterAttributes,
}: Props) {
  const router = useRouter();
  const cartAdd = useCartStore((s) => s.add);

  const [isOpen, setIsOpen] = useState(false);
  const [qty, setQty] = useState(1);                          // 단일(옵션 없는) 상품용
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]); // 옵션 있는 상품용
  const [showCartModal, setShowCartModal] = useState(false);

  // 유상 옵션 그룹 선택 중인 값(드롭다운 안에서만 유지, 담기 전 임시 상태)
  const defaultPriceSelections: Record<string, string> = Object.fromEntries(
    (priceOptionGroups ?? []).map((g) => [g.id, g.options[0].id])
  );
  const [draftColor, setDraftColor] = useState<ColorOption | null>(null);
  const [draftPriceSelections, setDraftPriceSelections] = useState<Record<string, string>>(defaultPriceSelections);

  // 장바구니 모달의 추천 상품 풀을 페이지 진입 시 미리 받아 둠 —
  // 모달이 열리는 순간 로딩 없이 추천이 바로 보이게 하기 위한 프리페치.
  // 실패해도 모달 쪽에서 다시 시도하므로 여기서는 조용히 무시
  useEffect(() => {
    prefetchRecommendPool(category[0]).catch(() => {});
  }, [category]);

  const hasColors = !!colors && colors.length > 0;
  const hasPriceOptionGroups = !!priceOptionGroups && priceOptionGroups.length > 0;
  const hasOptions = hasColors || hasPriceOptionGroups;
  const slotVisible = !hasOptions ? isOpen : selectedItems.length > 0;
  const ctaActive = slotVisible;

  // ── 옵션 가격 계산 헬퍼 ──────────────────────────────────────────────────
  function priceSelectionsDelta(selections: Record<string, string>): number {
    return Object.entries(selections).reduce((sum, [groupId, optionId]) => {
      const group = priceOptionGroups?.find((g) => g.id === groupId);
      const option = group?.options.find((o) => o.id === optionId);
      return sum + (option?.priceDelta ?? 0);
    }, 0);
  }

  function unitPrice(item: SelectedItem): number {
    const colorDelta = item.color ? colorPriceDelta(item.color) : 0;
    return price + colorDelta + priceSelectionsDelta(item.priceSelections);
  }

  function optionDisplayLabel(item: SelectedItem): string {
    const parts: string[] = [];
    if (item.color) parts.push(colorName(item.color));
    for (const group of priceOptionGroups ?? []) {
      const optionId = item.priceSelections[group.id];
      const option = group.options.find((o) => o.id === optionId);
      if (option) parts.push(option.label);
    }
    return parts.join(" / ");
  }

  function buildOptionKey(color: ColorOption | null, selections: Record<string, string>): string {
    const colorPart = color ? colorName(color) : "";
    const selectionsPart = Object.entries(selections)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([groupId, optionId]) => `${groupId}:${optionId}`)
      .join(",");
    return [colorPart, selectionsPart].filter(Boolean).join("|");
  }

  // ── 토글 ──────────────────────────────────────────────────────────────────
  function handleToggle() {
    if (!hasOptions) {
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

  // ── 색상만 있는 경우 — 클릭 즉시 슬롯 추가 (기존 동작 그대로 유지) ────────
  function selectColor(color: ColorOption) {
    const optionKey = buildOptionKey(color, {});
    if (!selectedItems.some((i) => i.optionKey === optionKey)) {
      setSelectedItems((prev) => [...prev, { optionKey, color, priceSelections: {}, qty: 1 }]);
    }
    setIsOpen(false);
  }

  // ── 유상 옵션(용량·세트 등)이 있는 경우 — 선택 후 "담기" 버튼으로 확정 ───
  function confirmDraftSelection() {
    const optionKey = buildOptionKey(draftColor, draftPriceSelections);
    if (!selectedItems.some((i) => i.optionKey === optionKey)) {
      setSelectedItems((prev) => [
        ...prev,
        { optionKey, color: draftColor ?? undefined, priceSelections: { ...draftPriceSelections }, qty: 1 },
      ]);
    }
    setDraftColor(null);
    setDraftPriceSelections(defaultPriceSelections);
    setIsOpen(false);
  }

  const draftReady = !hasColors || draftColor !== null;

  function removeItem(optionKey: string) {
    setSelectedItems((prev) => prev.filter((i) => i.optionKey !== optionKey));
  }

  function updateItemQty(optionKey: string, newQty: number) {
    setSelectedItems((prev) =>
      prev.map((i) => (i.optionKey === optionKey ? { ...i, qty: newQty } : i))
    );
  }

  const total = !hasOptions
    ? price * qty
    : selectedItems.reduce((sum, i) => sum + unitPrice(i) * i.qty, 0);

  // ── 장바구니 ──────────────────────────────────────────────────────────────
  function handleAddToCart() {
    if (!hasOptions) {
      cartAdd({ productId, name, thumbnail, price, originalPrice, optionLabel: variantLabel }, qty);
    } else {
      selectedItems.forEach((item) => {
        const delta = unitPrice(item) - price;
        cartAdd({
          productId,
          name,
          thumbnail,
          price: unitPrice(item),
          originalPrice: originalPrice !== undefined ? originalPrice + delta : undefined,
          optionLabel: optionDisplayLabel(item),
        }, item.qty);
      });
    }
    setIsOpen(false);
    setQty(1);
    setSelectedItems([]);
    setShowCartModal(true);
  }

  // ── 바로구매 ──────────────────────────────────────────────────────────────
  function handleBuyNow() {
    const checkoutItems = !hasOptions
      ? [{ productId, name, thumbnail, price, originalPrice, quantity: qty, optionLabel: variantLabel }]
      : selectedItems.map((item) => {
          const delta = unitPrice(item) - price;
          return {
            productId,
            name,
            thumbnail,
            price: unitPrice(item),
            originalPrice: originalPrice !== undefined ? originalPrice + delta : undefined,
            quantity: item.qty,
            optionLabel: optionDisplayLabel(item),
          };
        });
    sessionStorage.setItem("hanssem-checkout", JSON.stringify(checkoutItems));
    router.push("/checkout");
  }

  const alreadySelectedKeys = new Set(selectedItems.map((i) => i.optionKey));
  const draftOptionKeyTaken = alreadySelectedKeys.has(buildOptionKey(draftColor, draftPriceSelections));

  return (
    <>
    {showCartModal && (
      <AddToCartModal
        category={category}
        filterAttributes={filterAttributes}
        currentProductId={productId}
        onClose={() => setShowCartModal(false)}
      />
    )}
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

        {/* 색상만 있고 유상 옵션 그룹이 없는 경우 — 클릭 즉시 담기 (기존 동작) */}
        {isOpen && hasColors && !hasPriceOptionGroups && (
          <ul className={styles.colorOptionList} role="listbox" aria-label="색상 선택">
            {colors!.map((c) => {
              const name = colorName(c);
              const delta = colorPriceDelta(c);
              const disabled = alreadySelectedKeys.has(buildOptionKey(c, {}));
              return (
                <li key={name} role="option" aria-selected={disabled}>
                  <button
                    type="button"
                    className={`${styles.colorOption} ${disabled ? styles.colorOptionDisabled : ""}`}
                    onClick={() => !disabled && selectColor(c)}
                    disabled={disabled}
                  >
                    <span>{name}</span>
                    <span className={styles.colorOptionRight}>
                      {delta > 0 && <span className={styles.optionDelta}>+{formatPrice(delta)}원</span>}
                      {disabled && <span className={styles.colorOptionBadge}>선택됨</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* 유상 옵션 그룹이 있는 경우 — 색상(있다면)·그룹별 선택 후 담기 버튼으로 확정 */}
        {isOpen && hasPriceOptionGroups && (
          <div className={styles.optionPanel}>
            {hasColors && (
              <div className={styles.optionGroup}>
                <p className={styles.optionGroupLabel}>색상 선택</p>
                <div className={styles.optionChoiceList}>
                  {colors!.map((c) => {
                    const name = colorName(c);
                    const delta = colorPriceDelta(c);
                    const active = draftColor !== null && colorName(draftColor) === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        className={`${styles.optionChoice} ${active ? styles.optionChoiceActive : ""}`}
                        onClick={() => setDraftColor(c)}
                      >
                        {name}
                        {delta > 0 && <span className={styles.optionDelta}>+{formatPrice(delta)}원</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {priceOptionGroups!.map((group) => (
              <div key={group.id} className={styles.optionGroup}>
                <p className={styles.optionGroupLabel}>{group.label}</p>
                <div className={styles.optionChoiceList}>
                  {group.options.map((option) => {
                    const active = draftPriceSelections[group.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionChoice} ${active ? styles.optionChoiceActive : ""}`}
                        onClick={() =>
                          setDraftPriceSelections((prev) => ({ ...prev, [group.id]: option.id }))
                        }
                      >
                        {option.label}
                        {option.priceDelta > 0 && (
                          <span className={styles.optionDelta}>+{formatPrice(option.priceDelta)}원</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              type="button"
              className={styles.optionConfirmBtn}
              onClick={confirmDraftSelection}
              disabled={!draftReady || draftOptionKeyTaken}
            >
              {draftOptionKeyTaken ? "이미 담긴 옵션입니다" : "옵션 담기"}
            </button>
          </div>
        )}
      </div>

      {/* ── 선택 슬롯 ─────────────────────────────────────────────────── */}
      {slotVisible && (
        <div className={styles.slotList}>
          {/* 옵션 없는 단일 상품 */}
          {!hasOptions && (
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
                <span className={styles.slotSubtotal}>{formatPrice(price * qty)}원</span>
              </div>
            </div>
          )}

          {/* 옵션이 선택된 슬롯들 */}
          {hasOptions && selectedItems.map((item) => (
            <div key={item.optionKey} className={styles.slot}>
              <div className={styles.slotTop}>
                <div className={styles.slotNames}>
                  <span className={styles.slotName}>{name}</span>
                  <span className={styles.slotVariant}>ㄴ {optionDisplayLabel(item)}</span>
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
                <span className={styles.slotSubtotal}>{formatPrice(unitPrice(item) * item.qty)}원</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 총 구매가 ──────────────────────────────────────────────────── */}
      {ctaActive && (
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>총 구매가</span>
          <span className={styles.totalPrice}>{formatPrice(total)} 원</span>
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
    </>

  );
}
