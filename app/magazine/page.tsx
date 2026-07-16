import Link from "next/link";
import { ArrowIcon } from "@/app/components/Icon";
import Img from "@/app/components/Img";
import { MAGAZINE_ARTICLES } from "@/app/lib/magazine";
import styles from "./page.module.css";

export const metadata = { title: "매거진 — 한샘" };

function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

// 정적 콘텐츠 나열뿐이라 전체를 서버 컴포넌트로 유지 (필터·상태 없음)
export default function MagazinePage() {
  const [featured, ...rest] = MAGAZINE_ARTICLES;

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>매거진</span>
      </div>

      <div className={styles.head}>
        <p className={styles.kicker}>Magazine</p>
        <h1 className={styles.pageTitle}>매거진</h1>
      </div>

      <section className={styles.featured}>
        <Img src={featured.image} alt="" className={styles.featuredImage} priority />
        <div className={styles.featuredOverlay} />
        <div className={styles.featuredContent}>
          <p className={styles.featuredCategory}>{featured.category}</p>
          <h2 className={styles.featuredTitle}>{featured.title}</h2>
          <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
          <p className={styles.featuredDate}>{formatDate(featured.date)}</p>
        </div>
      </section>

      <ul className={styles.grid}>
        {rest.map((article) => (
          <li key={article.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Img src={article.image} alt="" className={styles.image} />
            </div>
            <p className={styles.category}>{article.category}</p>
            <h2 className={styles.cardTitle}>{article.title}</h2>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <p className={styles.date}>{formatDate(article.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
