import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'public', // Output directory for build files
    emptyOutDir: true, // Clear existing content before building
    rollupOptions: {
      input: 'client/App.vue', // Entry point for the app
      chunkFileNames: 'chunks/[name]-[hash].js', // Customize chunk filenames
      assetFileNames: '[name]-[hash].[ext]', // Customize asset filenames
    },
  },
  server: {
    open: true, // Open browser automatically on dev server start
  },
});
