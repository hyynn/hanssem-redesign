export type MagazineCategory = "스타일링" | "노하우" | "트렌드" | "홈스토리";

export interface MagazineArticle {
  id: string;
  category: MagazineCategory;
  title: string;
  excerpt: string;
  /** "YYYY-MM-DD" */
  date: string;
  image: string;
}

// 최신순 정렬 유지 — [0]이 피처드로 노출됨.
// 이미지는 기존 연출 컷을 재사용, 전용 에디토리얼 에셋 확보 시 교체
export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: "mg-summer-layering",
    category: "스타일링",
    title: "한여름 침실을 가볍게, 여름 레이어링의 기술",
    excerpt:
      "무거운 이불을 걷어내는 것만으로는 부족합니다. 소재와 톤을 바꿔 계절감을 완성하는 침실 레이어링 노하우를 소개합니다.",
    date: "2026-07-10",
    image: "/images/hero/hero-2.webp",
  },
  {
    id: "mg-small-living",
    category: "노하우",
    title: "10평대 거실을 넓어 보이게 하는 가구 배치 원칙",
    excerpt:
      "소파의 방향과 동선의 폭만 바꿔도 체감 면적이 달라집니다. 좁은 거실을 위한 배치 원칙 다섯 가지.",
    date: "2026-06-22",
    image: "/images/space-curation/livingroom-main.webp",
  },
  {
    id: "mg-warm-minimal",
    category: "트렌드",
    title: "차갑지 않은 미니멀, 웜 미니멀리즘이 온다",
    excerpt:
      "비우되 온기를 남기는 인테리어. 우드 톤과 패브릭으로 완성하는 웜 미니멀리즘 트렌드를 짚었습니다.",
    date: "2026-06-05",
    image: "/images/hero/hero-3.webp",
  },
  {
    id: "mg-newlywed-home",
    category: "홈스토리",
    title: "신혼 2년 차, 취향이 자리 잡은 24평 아파트",
    excerpt:
      "처음엔 유행을 따랐지만 살수록 우리다운 것이 남았다는 부부의 집. 시간이 만든 인테리어를 들여다봤습니다.",
    date: "2026-05-18",
    image: "/images/renovation/case-01.webp",
  },
  {
    id: "mg-bedroom-light",
    category: "노하우",
    title: "숙면을 부르는 침실 조명 설계",
    excerpt:
      "밝기보다 중요한 건 빛의 방향과 색온도. 잠들기 좋은 침실을 만드는 조명 설계의 기본을 정리했습니다.",
    date: "2026-04-27",
    image: "/images/space-curation/bedroom-main.webp",
  },
  {
    id: "mg-fabric-guide",
    category: "스타일링",
    title: "소파 패브릭, 실패 없이 고르는 법",
    excerpt:
      "보풀, 오염, 촉감까지. 쇼룸에서 확인해야 할 것과 집에 와서야 알게 되는 것들을 미리 알려드립니다.",
    date: "2026-04-08",
    image: "/images/space-curation/livingroom-main2.webp",
  },
  {
    id: "mg-old-house",
    category: "홈스토리",
    title: "지은 지 30년, 구옥의 뼈대를 살린 리모델링",
    excerpt:
      "허물지 않고 남겨서 더 좋아진 것들. 구옥 특유의 구조를 매력으로 바꾼 리모델링 과정을 담았습니다.",
    date: "2026-03-20",
    image: "/images/renovation/case-02.webp",
  },
];
