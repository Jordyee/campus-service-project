import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      // Semua request /api/* diteruskan ke Wrangler Worker
      "/api": {
        target: "http://127.0.0.1:8787",
        changeOrigin: true,
      },
    },
  },
});
