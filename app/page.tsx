import Hero, { HeroBanner } from "./components/Hero";
// Legacy (backup): import SpaceCuration from "./components/SpaceCuration";
// Legacy (backup): import BestSellerMarquee from "./components/BestSellerMarquee";
import SpaceCurationHotspot, { HotspotData } from "./components/SpaceCurationHotspot";
import BestSellerGrid from "./components/BestSellerGrid";
import RenovationSection from "./components/RenovationSection";
import { getBestSellers } from "./lib/catalog";

const banners: HeroBanner[] = [
  { id: "b1", image: "/images/hero/hero-1.webp", title: "한눈에 보이는\n테이블의 모든 것", subTitle: "2026.06.28 - 07.16\n용산 아이파크몰 리빙파크 5F 이벤트홀" },
  { id: "b2", image: "/images/hero/hero-2.webp", title: "인테리어 특가\n상반기 결산 이벤트", subTitle: "즉시할인 -23%\n최대 40만원 추가 할인" },
  { id: "b3", image: "/images/hero/hero-3.webp", title: "거실의 완성\n소파 라인업" },
  { id: "b4", image: "/images/hero/hero-4.webp", title: "한샘 수납가구\n이달의 혜택", subTitle: "매주 바뀌는 타임특가\n붙박이장 포토리뷰 사은품 증정" },
  { id: "b5", image: "/images/hero/hero-5.webp", title: "프리미엄 키친\n컬렉션", subTitle: "공식몰 신제품 단독 공개" },
  { id: "b6", image: "/images/hero/hero-6.webp", title: "스타일 플래너로\n내 공간 미리보기" },
];

// x/y 좌표는 실제 이미지 배치 후 조정 필요 (0~100 %)
const livingHotspots: HotspotData[] = [
  { id: "lr1", x: 34, y: 64, productId: "1110120010" },
  { id: "lr2", x: 52, y: 76, productId: "1111110010" },
  { id: "lr3", x: 80, y: 68, productId: "1111100011" },
];

const bedroomHotspots: HotspotData[] = [
  { id: "br1", x: 14, y: 59, productId: "1012100010" },
  { id: "br2", x: 54, y: 66, productId: "1010120012" },
  { id: "br3", x: 88, y: 75, productId: "1012120010" },
];

export default function Page() {
  return (
    <>
      <Hero banners={banners} />

      <SpaceCurationHotspot
        spaceLabel="거실 · Living Room"
        tagline="편안함의 기준을 높이다"
        image="/images/space-curation/livingroom-main.webp"
        hotspots={livingHotspots}
      />

      <SpaceCurationHotspot
        spaceLabel="침실 · Bedroom"
        tagline="잠드는 순간도, 깨는 순간도"
        image="/images/space-curation/bedroom-main.webp"
        hotspots={bedroomHotspots}
      />

      <BestSellerGrid products={getBestSellers(8)} />

      <RenovationSection />
    </>
  );
}
