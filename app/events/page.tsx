import Link from "next/link";
import { ArrowIcon } from "@/app/components/Icon";
import { getEventsWithStatus } from "@/app/lib/events";
import EventList from "./EventList";
import styles from "./page.module.css";

export const metadata = { title: "이벤트 — 한샘" };

// 진행중/종료 상태가 빌드 시점 날짜로 고정되지 않도록 매시간 재생성
export const revalidate = 3600;

// 이벤트는 건수가 적고 정적이라 API 없이 데이터 모듈을 직접 읽어 내려줌.
// 상태 칩 필터링만 클라이언트(EventList)에서 수행
export default function EventsPage() {
  const events = getEventsWithStatus();

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>홈</Link>
        <span className={styles.sep}><ArrowIcon direction="right" size={14} /></span>
        <span>이벤트</span>
      </div>

      <div className={styles.inner}>
        <p className={styles.kicker}>Event</p>
        <h1 className={styles.pageTitle}>이벤트</h1>
        <EventList events={events} />
      </div>
    </div>
  );
}
