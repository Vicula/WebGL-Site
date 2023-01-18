import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import glsl from 'vite-plugin-glsl';
// 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), glsl(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
