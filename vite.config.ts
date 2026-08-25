/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Main config for unit tests and storybook tests
// For unit tests only: pnpm vitest
// For storybook tests only: pnpm vitest --config vitest.storybook.config.ts
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/routes.gen.ts",
    }),
    react(),
    compression(),
    vanillaExtractPlugin(),
    tailwindcss(),
  ],
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
    includeSource: ["src/**/*.{js,jsx,ts,tsx}"],
    exclude: ["**/*.stories.{js,jsx,ts,tsx}", "**/node_modules/**"],
  },
});
