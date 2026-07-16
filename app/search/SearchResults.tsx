"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProductSummary } from "@/app/lib/types";
import type { SearchResponse } from "@/app/lib/api-types";
import ProductCard from "@/app/components/ProductCard";
import styles from "./page.module.css";

interface Props {
  query: string; // 상위 서버 컴포넌트가 key={query}로 렌더 — query가 바뀌면 리마운트되어 항상 loading부터 시작
}

type Status = "loading" | "done" | "error";

export default function SearchResults({ query }: Props) {
  const [results, setResults] = useState<ProductSummary[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  // 재시도 버튼이 이 값을 올려 fetch effect를 다시 실행시킴 (query는 그대로)
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`search failed: ${res.status}`);
        const data: SearchResponse = await res.json();
        setResults(data.products);
        setStatus("done");
      } catch {
        // abort는 언마운트(다른 검색어로 이동) 시점이므로 에러 표시 대상이 아님
        if (!controller.signal.aborted) setStatus("error");
      }
    })();
    return () => controller.abort();
  }, [query, attempt]);

  return (
    <>
      <h1 className={styles.pageTitle}>
        &lsquo;<strong className={styles.pageTitleQuery}>{query}</strong>&rsquo;
        <span className={styles.pageTitleLabel}>검색 결과</span>
        {/* 건수는 응답 후에만 표시 — 로딩 중 0이 잠깐 보이는 것 방지 */}
        {status === "done" && <span className={styles.pageTitleCount}>{results.length}</span>}
      </h1>

      {status === "loading" && (
        <div className={styles.empty} role="status">
          <p className={styles.emptyBody}>검색 결과를 불러오는 중이에요…</p>
        </div>
      )}

      {status === "error" && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>검색 결과를 불러오지 못했어요</p>
          <p className={styles.emptyBody}>네트워크 상태를 확인한 뒤 다시 시도해 주세요.</p>
          <button
            type="button"
            className={styles.emptyBtn}
            onClick={() => {
              setStatus("loading");
              setAttempt((n) => n + 1);
            }}
          >
            다시 시도
          </button>
        </div>
      )}

      {status === "done" &&
        (results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>검색 결과가 없습니다</p>
            <p className={styles.emptyBody}>다른 검색어를 입력하거나 카테고리에서 상품을 둘러보세요</p>
            <Link href="/category/bedroom" className={styles.emptyBtn}>상품 보러가기</Link>
          </div>
        ))}
    </>
  );
}
