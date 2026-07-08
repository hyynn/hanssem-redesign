import Link from "next/link";
import { catalog } from "@/app/lib/catalog";
import { searchProducts } from "@/lib/search";
import ProductCard from "@/app/components/ProductCard";
import { ArrowIcon } from "@/app/components/Icon";
import styles from "./page.module.css";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return { title: q ? `'${q}' 검색 결과 — 한샘` : "검색 — 한샘" };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchProducts(query, catalog) : [];

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>검색</span>
      </div>

      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>
          {query ? (
            <>
              &lsquo;<strong className={styles.pageTitleQuery}>{query}</strong>&rsquo;
              <span className={styles.pageTitleLabel}>검색 결과</span>
              <span className={styles.pageTitleCount}>{results.length}</span>
            </>
          ) : (
            "검색"
          )}
        </h1>

        {results.length > 0 ? (
          <div className={styles.grid}>
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>
              {query ? "검색 결과가 없습니다" : "검색어를 입력해 주세요"}
            </p>
            <p className={styles.emptyBody}>
              {query
                ? "다른 검색어를 입력하거나 카테고리에서 상품을 둘러보세요"
                : "상품명 또는 카테고리명으로 검색할 수 있습니다"}
            </p>
            <Link href="/category/bedroom" className={styles.emptyBtn}>상품 보러가기</Link>
          </div>
        )}
      </div>
    </div>
  );
}
