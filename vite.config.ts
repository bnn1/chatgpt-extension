import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        background: "src/background.ts",
      },
      output: {
        format: "es",
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "chunks/[name].js",
        entryFileNames: "[name].js",
      },
      preserveEntrySignatures: "strict",
    },
  },
});
