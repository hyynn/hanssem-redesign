/* eslint-disable no-restricted-syntax, @next/next/no-img-element, jsx-a11y/alt-text
   -- 원시 <img>를 감싸는 유일하게 허용된 지점. alt는 호출부에서 props로 전달됨 */
import type { ImgHTMLAttributes } from "react";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** 첫 화면(LCP) 이미지에만 사용 — eager 로드 + SSR preload(fetchPriority high) */
  priority?: boolean;
}

/**
 * 프로젝트 공용 이미지 컴포넌트. 원시 <img> 직접 사용 금지 (ESLint로 강제).
 *
 * React 19 SSR은 loading="lazy" / fetchPriority="low"가 아닌 모든 <img>에
 * <link rel="preload">를 자동 주입하므로, 기본값을 lazy로 두어
 * 불필요한 preload("preloaded but not used" 경고)를 구조적으로 차단한다.
 */
export default function Img({ priority = false, ...props }: ImgProps) {
  return priority ? (
    <img {...props} fetchPriority="high" />
  ) : (
    <img {...props} loading="lazy" />
  );
}
