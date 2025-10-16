// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Tudo que começar com /api/tsdb/ vai para TheSportsDB
      '/api/tsdb/': {
        target: 'https://www.thesportsdb.com/api/v1/json/3',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/tsdb\//, '/'),
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
