import { defineConfig } from "wxt";

import UnoCSS from "unocss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  async vite(env) {
    return Promise.resolve({
      plugins: [UnoCSS()],
      build: {
        sourcemap: false,
      },
    });
  },
  manifest: {
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content-scripts/content.js"],
      },
    ],
  },
});
