import styles from "./DeliveryInfoBox.module.css";

interface DeliveryInfoBoxProps {
  method: string;
  region: string;
}

export default function DeliveryInfoBox({ method, region }: DeliveryInfoBoxProps) {
  return (
    <details className={styles.box}>
      <summary className={styles.summary}>배송정보</summary>
      <div className={styles.content}>
        <p>
          <strong>배송 방법:</strong> {method}
        </p>
        <p>
          <strong>배송가능지역:</strong> {region}
        </p>
      </div>
    </details>
  );
}
