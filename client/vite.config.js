import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    open: true,
    proxy: {
      '/api': 'http://localhost:5050', // Proxy API requests to your backend server
    },
  },
  build: {
    rollupOptions: {
      input: 'client/index.html', // Ensure the right entry point is being used
    },
  },
});
