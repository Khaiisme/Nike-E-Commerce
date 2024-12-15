import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  build: {
    outDir: "dist",
  },
  // Add this for proper history fallback
  base: "/",
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
