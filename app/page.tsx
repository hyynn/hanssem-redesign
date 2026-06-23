import Hero, { HeroBanner } from "./components/Hero";
import SpaceCuration from "./components/SpaceCuration";
import BestSellerMarquee from "./components/BestSellerMarquee";
import { getByCategory, getBestSellers } from "./lib/catalog";
import styles from "./page.module.css";

const banners: HeroBanner[] = [
  { id: "b1", image: "/images/hero/hero-1.webp", title: "한눈에 보이는\n테이블의 모든 것", subTitle: "2026.06.28 - 07.16\n용산 아이파크몰 리빙파크 5F 이벤트홀" },
  { id: "b2", image: "/images/hero/hero-2.webp", title: "인테리어 특가\n상반기 결산 이벤트", subTitle: "즉시할인 -23%\n최대 40만원 추가 할인" },
  { id: "b3", image: "/images/hero/hero-3.webp", title: "거실의 완성\n소파 라인업" },
  { id: "b4", image: "/images/hero/hero-4.webp", title: "한샘 수납가구\n이달의 혜택", subTitle: "매주 바뀌는 타임특가\n붙박이장 포토리뷰 사은품 증정" },
  { id: "b5", image: "/images/hero/hero-5.webp", title: "프리미엄 키친\n컬렉션", subTitle: "공식몰 신제품 단독 공개" },
  { id: "b6", image: "/images/hero/hero-6.webp", title: "스타일 플래너로\n내 공간 미리보기" },
];

const spaceCurations = [
  {
    title: "침실 공간",
    description: "인테리어의 차원은 곧 완벽한 공간에서 시작됩니다.",
    image: "/images/space-curation/bedroom-main.jpg",
    products: getByCategory("침실"),
  },
  {
    title: "거실 공간",
    description: "가족이 모이는 가장 따뜻한 순간.",
    image: "/images/space-curation/living-main.jpg",
    products: getByCategory("거실"),
  },
  {
    title: "다이닝 공간",
    description: "함께 식사하는 시간이 특별해지는 공간.",
    image: "/images/space-curation/dining-main.jpg",
    products: getByCategory("다이닝"),
  },
];

export default function Page() {
  return (
    <>
      <Hero banners={banners} />

      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>SPACE CURATION</h3>
        <button className={styles.moreBtn}>전체보기 &gt;</button>
      </div>

      {spaceCurations.map((curation, index) => (
        <SpaceCuration
          key={curation.title}
          {...curation}
          reverse={index % 2 === 1}
        />
      ))}

      <BestSellerMarquee products={getBestSellers(8)} />
    </>
  );
}
