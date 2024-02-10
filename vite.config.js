import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

export default defineConfig({
    plugins: [
        vue(),
        checker({
          // Optional plugin configuration options
        }),
      ],
  build: {
    outDir: 'public', // Output directory for build files
    emptyOutDir: true, // Clear existing content before building
    rollupOptions: {
      input: 'client/App.vue', // Entry point for the apps
    },
  },
  server: {
    open: true, // Open browser automatically on dev server start
  },
});
