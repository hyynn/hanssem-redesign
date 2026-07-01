"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { catalog } from "@/app/lib/catalog";
import type { ProductSummary, FilterAttributes } from "@/app/lib/types";
import styles from "./AddToCartModal.module.css";

interface Props {
  category: string[];
  filterAttributes?: FilterAttributes;
  currentProductId: string;
  onClose: () => void;
}

function expandSizes(sizes: string[]): string[] {
  return sizes.flatMap((s) => (s.includes("/") ? s.split("/") : [s]));
}

function getRecommended(category: string[], currentId: string, filterAttributes?: FilterAttributes): ProductSummary[] {
  const mainCat = category[0];
  const subCat = category[1];
  const currentSizes = filterAttributes?.size;
  const hasMattress = filterAttributes?.config?.some((c) => c.includes("매트")) ?? false;
  const expandedCurrentSizes = currentSizes ? expandSizes(currentSizes) : null;

  const excludeSubCats = new Set([subCat]);
  if (hasMattress) excludeSubCats.add("매트리스");

  return catalog
    .filter((p) => {
      if (p.id === currentId) return false;
      if (p.category[0] !== mainCat) return false;
      if (excludeSubCats.has(p.category[1])) return false;
      // 매트 포함 상품이면 사이즈 필터 미적용 (협탁·드레서 등 사이즈 없는 상품 포함)
      // 추천 상품에 size가 있을 때만 현재 상품의 size와 비교 — size 없는 상품은 항상 통과
      if (expandedCurrentSizes && !hasMattress) {
        const pSizes = p.filterAttributes?.size;
        if (pSizes && !expandedCurrentSizes.some((s) => expandSizes(pSizes).includes(s))) return false;
      }
      return true;
    })
    .slice(0, 3);
}

export default function AddToCartModal({ category, filterAttributes, currentProductId, onClose }: Props) {
  const router = useRouter();
  const recommended = getRecommended(category, currentProductId, filterAttributes);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.header}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="10" cy="10" r="9" stroke="var(--color-text-heading)" strokeWidth="1.2" />
            <path d="M5.5 10L8.5 13L14.5 7" stroke="var(--color-text-heading)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className={styles.title}>장바구니에 상품이 담겼습니다.</p>
        </div>

        {recommended.length > 0 && (
          <div className={styles.recommended}>
            <p className={styles.recommendLabel}>함께 구매하면 좋은 상품</p>
            <div className={styles.cards}>
              {recommended.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={styles.card}
                  onClick={() => { onClose(); router.push(`/products/${p.id}`); }}
                >
                  <div className={styles.cardImageWrap}>
                    <img src={p.thumbnail} alt={p.name} className={styles.cardImage} />
                  </div>
                  <p className={styles.cardName}>{p.name}</p>
                  <div className={styles.cardPrice}>
                    {p.discountRate > 0 && (
                      <span className={styles.cardDiscount}>{p.discountRate}%</span>
                    )}
                    <span className={styles.cardPriceValue}>{p.price.toLocaleString()}원</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={onClose}>
            쇼핑 계속하기
          </button>
          <button type="button" className={styles.btnPrimary} onClick={() => router.push("/cart")}>
            장바구니 보기
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
