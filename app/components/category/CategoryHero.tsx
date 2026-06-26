import styles from "./CategoryHero.module.css";

interface Props {
  label?: string;
  title: string;
  body?: string;
  image: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CategoryHero({
  label,
  title,
  body,
  image,
  ctaLabel = "알아보기",
  ctaHref = "#",
}: Props) {
  return (
    <section className={styles.hero}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {label && <p className={styles.label}>{label}</p>}
        <h1 className={styles.title}>{title}</h1>
        {body && <p className={styles.body}>{body}</p>}
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel} →
        </a>
      </div>
    </section>
  );
}
