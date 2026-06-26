import styles from "./SubcategoryBanner.module.css";

interface Props {
  image: string;
  title: string;
  body: string;
}

export default function SubcategoryBanner({ image, title, body }: Props) {
  return (
    <div className={styles.banner}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.overlay}>
        <p className={styles.title}>{title}</p>
        <p className={styles.body}>{body}</p>
      </div>
    </div>
  );
}
