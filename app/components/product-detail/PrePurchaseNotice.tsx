import styles from "./PrePurchaseNotice.module.css";

interface NoticeItem {
  title: string;
  content: string;
}

const NOTICES: NoticeItem[] = [
  {
    title: "구매전 필수 확인사항",
    content:
      "본 상품은 사전판매 상품으로, 결제 후 순차 배송됩니다. 색상 및 옵션 변경은 배송 전까지만 가능합니다.",
  },
  {
    title: "상품 고시정보",
    content:
      "품명: 침대 / 소재: LPM, 스틸 / 제조국: 대한민국 / KC 인증 완료 / A/S 책임자: 한샘 고객센터(1688-4945)",
  },
  {
    title: "교환 / 반품",
    content:
      "단순 변심 교환/반품은 상품 수령 후 7일 이내 가능하며, 왕복 배송비는 고객 부담입니다. 제품 하자의 경우 무료 교환/반품됩니다.",
  },
];

export default function PrePurchaseNotice() {
  return (
    <div className={styles.wrapper}>
      {NOTICES.map((notice) => (
        <details key={notice.title} className={styles.item}>
          <summary className={styles.summary}>{notice.title}</summary>
          <p className={styles.content}>{notice.content}</p>
        </details>
      ))}
    </div>
  );
}
