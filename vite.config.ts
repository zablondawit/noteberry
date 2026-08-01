import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression2";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), compression(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
