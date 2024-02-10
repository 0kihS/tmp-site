import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    middleware: [
      {
        path: '/api', // Adjust the path as needed
        handle: (req, res) => {
          // Redirect API requests to your server.cjs script
          // assuming it exposes an Express app
          const expressApp = require('./backend/server.cjs'); // You might need to adjust the path
          expressApp(req, res);
        },
      },
    ],
  },
  build: {
    outDir: 'dist', // Optional: output directory for production build
  },
});
