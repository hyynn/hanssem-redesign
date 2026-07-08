import Img from "@/app/components/Img";
import styles from "./EventBanner.module.css";

interface Props {
  image: string;
  alt?: string;
  href?: string;
  title?: string;
  body?: string;
}

export default function EventBanner({ image, alt = "이벤트 배너", href, title, body }: Props) {
  const hasText = title || body;

  const inner = (
    <>
      <Img src={image} alt={alt} className={styles.image} />
      {hasText && <div className={styles.overlay} />}
      {hasText && (
        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {body && <p className={styles.body}>{body}</p>}
        </div>
      )}
    </>
  );

  return (
    <div className={styles.wrapper}>
      {href ? (
        <a href={href} className={styles.link}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
