import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**", "@/features/*", "@/features/*/**"],
              message: "Shared code must not depend on app or feature code.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**"],
              message: "Feature code must not depend on the routing layer.",
            },
            {
              group: ["@/features/*", "@/features/*/**"],
              message: "Features must not depend on another feature.",
            },
            {
              group: [
                "@/shared/api/*",
                "@/shared/i18n/*",
                "@/shared/ui/form/*",
              ],
              message: "Import shared modules through their public entrypoint.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/**"],
              message: "Import features through their public entrypoint.",
            },
            {
              group: [
                "@/shared/api/*",
                "@/shared/i18n/*",
                "@/shared/ui/form/*",
              ],
              message: "Import shared modules through their public entrypoint.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
