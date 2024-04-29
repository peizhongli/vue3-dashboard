import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
    },
  },
  server: {
    proxy: {
      "/api/weather": {
        target: "http://t.weather.itboy.net/api/weather/city",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("rewrite", path.replace(/^\/api/, ""));
          return path.replace(/^\/api\/weather/, "");
        },
      },
    },
  },
  build: {
    assetsDir: ''
  }
});
