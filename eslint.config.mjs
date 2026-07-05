import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 원시 <img> 직접 사용 금지 — 공용 Img 컴포넌트(기본 lazy, LCP는 priority)만 사용.
  // 허용 예외는 app/components/Img.tsx 내부의 eslint-disable 한 곳뿐.
  {
    files: ["**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='img']",
          message:
            "원시 <img> 대신 app/components/Img를 사용하세요 (기본 lazy, 첫 화면 LCP만 priority).",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
