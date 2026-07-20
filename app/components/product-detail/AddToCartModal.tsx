"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import type { ProductSummary, FilterAttributes } from "@/app/lib/types";
import type { ProductListResponse } from "@/app/lib/api-types";
import Img from "@/app/components/Img";
import { formatPrice } from "@/lib/format";
import styles from "./AddToCartModal.module.css";

/* 추천 후보 풀(같은 대분류 상품 목록) 캐시 — 모듈 레벨이라 모달을 닫았다 열거나
   같은 대분류의 다른 상품 페이지로 이동해도 세션 내내 재사용됨.
   값 캐시(동기 조회용)와 진행 중 Promise 캐시(중복 fetch 방지용)를 분리 */
const poolCache = new Map<string, ProductSummary[]>();
const poolPending = new Map<string, Promise<ProductSummary[]>>();

/* 상품 페이지(OrderArea)가 마운트 시점에 미리 호출 — 사용자가 장바구니 버튼을
   누르기 전에 풀을 받아 두어, 모달이 열릴 때 로딩 상태 없이 바로 추천이 보임 */
export function prefetchRecommendPool(mainCat: string): Promise<ProductSummary[]> {
  const cached = poolCache.get(mainCat);
  if (cached) return Promise.resolve(cached);
  const pending = poolPending.get(mainCat);
  if (pending) return pending;

  const promise = (async () => {
    // pageSize=100: 추천 필터링은 대분류 전체를 후보로 삼아야 해서 페이지네이션 없이 한 번에 수신
    const res = await fetch(
      `/api/products?category=${encodeURIComponent(mainCat)}&pageSize=100`,
    );
    if (!res.ok) throw new Error(`recommend pool failed: ${res.status}`);
    const data: ProductListResponse = await res.json();
    poolCache.set(mainCat, data.products);
    return data.products;
  })();
  poolPending.set(mainCat, promise);
  // 실패 시 pending을 비워 다음 시도에서 다시 fetch할 수 있게 함
  promise.catch(() => {}).finally(() => poolPending.delete(mainCat));
  return promise;
}

interface Props {
  category: string[];
  filterAttributes?: FilterAttributes;
  currentProductId: string;
  onClose: () => void;
}

function expandSizes(sizes: string[]): string[] {
  return sizes.flatMap((s) => (s.includes("/") ? s.split("/") : [s]));
}

function getRecommended(pool: ProductSummary[], category: string[], currentId: string, filterAttributes?: FilterAttributes): ProductSummary[] {
  const mainCat = category[0];
  const subCat = category[1];
  const currentSizes = filterAttributes?.size;
  const hasMattress = filterAttributes?.config?.some((c) => c.includes("매트")) ?? false;
  const expandedCurrentSizes = currentSizes ? expandSizes(currentSizes) : null;

  const excludeSubCats = new Set([subCat]);
  if (hasMattress) excludeSubCats.add("매트리스");

  return pool
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
  // 프리페치가 끝났으면 첫 렌더부터 캐시로 채움 — 로딩 상태 없이 추천이 바로 보임
  const [pool, setPool] = useState<ProductSummary[]>(
    () => poolCache.get(category[0]) ?? [],
  );

  // 캐시 미스(프리페치 실패·미완료)일 때만 여기서 받아옴.
  // 추천은 부가 정보라 실패 시 별도 에러 표시 없이 섹션만 생략
  useEffect(() => {
    if (poolCache.has(category[0])) return;
    let alive = true;
    prefetchRecommendPool(category[0])
      .then((products) => { if (alive) setPool(products); })
      .catch(() => {});
    return () => { alive = false; };
  }, [category]);

  const recommended = getRecommended(pool, category, currentProductId, filterAttributes);

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
                    <Img src={p.thumbnail} alt={p.name} className={styles.cardImage} />
                  </div>
                  <p className={styles.cardName}>{p.name}</p>
                  <div className={styles.cardPrice}>
                    {p.discountRate > 0 && (
                      <span className={styles.cardDiscount}>{p.discountRate}%</span>
                    )}
                    <span className={styles.cardPriceValue}>{formatPrice(p.price)}원</span>
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
