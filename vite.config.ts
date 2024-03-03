import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  server: {
    proxy: {
      '/search': {
        target: 'https://mechanical-mokey-backend.onrender.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending request to the target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received response from the target:', proxyRes.statusCode, req.url);
          });
        },
      },
    }
    
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