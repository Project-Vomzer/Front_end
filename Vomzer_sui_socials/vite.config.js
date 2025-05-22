import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // For CoinGecko API
      '/api/coingecko': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
            proxyReq.setHeader('Accept', 'application/json');
          });
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
        },
      },
      // For your Java backend
      '/api': {
        target: 'https://vomzersocials-java-backend-1.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Accept', 'application/json');
          });
          proxy.on('error', (err) => {
            console.error('Backend proxy error:', err);
          });
        },
      },
    },
  },
});