import styles from "./DeliverySection.module.css";
import { DeliveryGuideGroup } from "./types";

export default function DeliverySection({ guides }: { guides: DeliveryGuideGroup[] }) {
  return (
    <section id="delivery" className={styles.section}>
      <h2 className={styles.heading}>배송 안내</h2>
      {guides.map((group) => (
        <div key={group.title} className={styles.group}>
          <h3 className={styles.groupTitle}>{group.title}</h3>
          <table className={styles.table}>
            <tbody>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}
