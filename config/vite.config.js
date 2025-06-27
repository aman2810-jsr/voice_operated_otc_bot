// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5000,
    proxy: {
      '/api': 'http://localhost:3000'  // 👈 Proxy all /api calls to Express backend
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

