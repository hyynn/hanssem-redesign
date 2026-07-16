import Link from "next/link";
import { ArrowIcon } from "@/app/components/Icon";
import SearchResults from "./SearchResults";
import styles from "./page.module.css";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return { title: q ? `'${q}' 검색 결과 — 한샘` : "검색 — 한샘" };
}

// 페이지 골격(메타데이터·브레드크럼)은 서버에 두고, 결과 목록만 클라이언트에서
// /api/products/search를 fetch — 로딩/에러/빈 결과 상태는 SearchResults가 담당
export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>검색</span>
      </div>

      <div className={styles.inner}>
        {query ? (
          // key={query}: 검색어가 바뀌면 리마운트되어 이전 검색어의 결과·상태가 남지 않음
          <SearchResults key={query} query={query} />
        ) : (
          <>
            <h1 className={styles.pageTitle}>검색</h1>
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>검색어를 입력해 주세요</p>
              <p className={styles.emptyBody}>상품명 또는 카테고리명으로 검색할 수 있습니다</p>
              <Link href="/category/bedroom" className={styles.emptyBtn}>상품 보러가기</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
