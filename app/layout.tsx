import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
// Pretendard Variable 다이나믹 서브셋 — unicode-range로 쪼갠 92개 조각 중
// 페이지에 실제 쓰인 글자 조각만 받음. 번들링되어 같은 도메인에서 self-host
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HANSSEM",
  description: "한샘 공식 홈페이지 리디자인",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}