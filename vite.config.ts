import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  server: {
    proxy: {
      '/search': {
        target: 'https://mechanical-mokey-backend.onrender.com/', // Replace with your actual backend port
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist', // Optional: output directory for production build
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})