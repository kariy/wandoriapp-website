import { defineConfig } from "vite";
import { resolve } from "node:path";

// Relative base so the build works on both a custom domain and a
// GitHub Pages project path (https://<user>.github.io/<repo>/).
// If you deploy to a custom domain at the root, "./" still works.
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        thanks: resolve(__dirname, "thanks.html"),
      },
    },
  },
});
