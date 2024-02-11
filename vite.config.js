import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/search': {
        target: 'https://mechanical-mokey-backend.onrender.com/', // Replace with your actual backend port
        changeOrigin: true,
      },
    },
  build: {
    outDir: 'dist', // Optional: output directory for production build
  },
}});
