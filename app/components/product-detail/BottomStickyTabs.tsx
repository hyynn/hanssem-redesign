import styles from "./BottomStickyTabs.module.css";

const TABS = [
  { id: "detail-info", label: "상품정보" },
  { id: "review", label: "후기" },
  { id: "qna", label: "문의" },
  { id: "delivery", label: "배송" },
];

export default function BottomStickyTabs() {
  return (
    <nav className={styles.nav}>
      {TABS.map((tab) => (
        <a key={tab.id} href={`#${tab.id}`} className={styles.tab}>
          {tab.label}
        </a>
      ))}
    </nav>
  );
}
