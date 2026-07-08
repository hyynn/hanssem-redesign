import Img from "@/app/components/Img";
import styles from "./SubcategoryBanner.module.css";

interface Props {
  image: string;
  title: string;
  body: string;
}

export default function SubcategoryBanner({ image, title, body }: Props) {
  return (
    <div className={styles.banner}>
      <Img src={image} alt={title} className={styles.image} />
      <div className={styles.overlay}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
      </div>
    </div>
  );
}
