/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Storybook test config
// Run with: pnpm vitest --config vitest.storybook.config.ts
export default defineConfig({
  plugins: [react(), compression(), vanillaExtractPlugin(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  define: {
    "import.meta.vitest": "undefined",
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
        },
      },
    ],
  },
});
