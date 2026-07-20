import type { NoticeItem } from "@/app/lib/types";
import styles from "./PrePurchaseNotice.module.css";

export default function PrePurchaseNotice({ notices }: { notices: NoticeItem[] }) {
  return (
    <div className={styles.wrapper}>
      {notices.map((notice) => (
        <details key={notice.title} className={styles.item}>
          <summary className={styles.summary}>{notice.title}</summary>
          <p className={styles.content}>{notice.content}</p>
        </details>
      ))}
    </div>
  );
}
