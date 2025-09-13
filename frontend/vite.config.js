// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,         // Você pode mudar a porta se quiser
    open: true          // Abre o navegador automaticamente
  },
  resolve: {
    alias: {
      '@': '/src'       // Permite importar arquivos usando @ (ex: import x from '@/pages/App')
    }
  }
});
