import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/search': {
        target: 'https://effective-space-broccoli-xgpg7p9766v3pjq7-3000.app.github.dev/', // Replace with your actual backend port
        changeOrigin: true,
      },
    },
  build: {
    outDir: 'dist', // Optional: output directory for production build
  },
}});
