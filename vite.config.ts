import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    // Smaller, cache-friendly chunks: three.js + motion isolated from app code
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three") || id.includes("node_modules\\three")) {
            return "three";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules\\framer-motion")) {
            return "motion";
          }
          return undefined;
        },
      },
    },
  },
});
