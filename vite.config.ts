import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        control: resolve(__dirname, "src/control/index.html"),
        observer: resolve(__dirname, "src/observer/index.html"),
        settings: resolve(__dirname, "src/settings/index.html")
      }
    }
  },
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"]
  }
});
