import styles from "./RenovationSection.module.css";

interface CaseItem {
  id: string;
  image?: string;
  area: string;
  style: string;
  type: string;
}

interface Props {
  cases?: CaseItem[];
}

const DEFAULT_CASES: CaseItem[] = [
  { id: "c1", area: "32평 아파트", style: "모던 미니멀", type: "전체 리모델링" },
  { id: "c2", area: "25평 아파트", style: "북유럽 스타일", type: "주방 + 침실" },
  { id: "c3", area: "43평 아파트", style: "내추럴 모던", type: "전체 리모델링" },
];

export default function RenovationSection({ cases = DEFAULT_CASES }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.packageRow}>
        <div className={styles.packageText}>
          <p className={styles.label}>Renovation Package</p>
          <h2 className={styles.title}>평수별 리모델링 패키지</h2>
          <p className={styles.desc}>
            우리 집 평수에 맞는 최적의 솔루션, 지금 무료로 확인하세요
          </p>
        </div>
        <a href="#" className={styles.ctaBtn}>무료 견적 받기 →</a>
      </div>

      <div className={styles.divider} />

      <div className={styles.casesSection}>
        <p className={styles.casesLabel}>인기 시공 사례</p>
        <div className={styles.casesGrid}>
          {cases.map((c) => (
            <div key={c.id} className={styles.caseCard}>
              <div className={styles.caseImage}>
                {c.image && <img src={c.image} alt={`${c.area} ${c.type}`} />}
              </div>
              <div className={styles.caseInfo}>
                <p className={styles.caseMeta}>{c.area} · {c.style}</p>
                <p className={styles.caseType}>{c.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
