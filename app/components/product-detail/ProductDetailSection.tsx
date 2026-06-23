import { ProductDetailSection as Section } from "./types";
import styles from "./ProductDetailSection.module.css";
import LazyVideo from "./LazyVideo";

export default function ProductDetailSection({ section }: { section: Section }) {
  return (
    <section id={section.id} className={styles.section}>
      {section.blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div key={index} className={styles.textBlock}>
              {block.title && <h3>{block.title}</h3>}
              <p>{block.body}</p>
            </div>
          );
        }
        if (block.type === "video") {
          return (
            <div key={index} className={styles.videoBlock}>
              <LazyVideo src={block.src} />
            </div>
          );
        }
        return (
          <div key={index} className={styles.imageBlock}>
            <img src={block.src} alt={block.alt} />
          </div>
        );
      })}
    </section>
  );
}
