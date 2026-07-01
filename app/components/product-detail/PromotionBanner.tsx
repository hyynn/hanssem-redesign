import styles from "./PromotionBanner.module.css";

interface Promotion {
  title: string;
  image: string;
}

export default function PromotionBanner({
  promotions,
}: {
  promotions: Promotion[];
}) {
  if (promotions.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>이벤트</p>
      <div className={styles.grid}>
        {promotions.map((promo) => (
          <div key={promo.title} className={styles.item}>
            <img src={promo.image} alt={promo.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
