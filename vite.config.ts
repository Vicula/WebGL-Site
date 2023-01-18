import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import glsl from 'vite-plugin-glsl';
// glsl()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // dont need to include file extenstion .scss
        // additionalData: `@import "./src/styles/mixins";`
      },
    },
  },
});
