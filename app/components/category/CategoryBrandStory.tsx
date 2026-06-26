import styles from "./CategoryBrandStory.module.css";

interface Props {
  label?: string;
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
  imageAlt?: string;
}

export default function CategoryBrandStory({
  label,
  title,
  body,
  ctaLabel = "알아보기",
  ctaHref = "#",
  image,
  imageAlt,
}: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.text}>
        {label && <p className={styles.label}>{label}</p>}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.body}>{body}</p>
        <a href={ctaHref} className={styles.cta}>
          {ctaLabel} →
        </a>
      </div>
      <div className={styles.imageWrapper}>
        <img src={image} alt={imageAlt ?? title} className={styles.image} />
      </div>
    </section>
  );
}
