import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    open: true,
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html', // ✅ Correct entry point
    },
    outDir: 'dist', // ✅ Make sure it outputs to dist
    emptyOutDir: true, // ✅ Clears old builds
  },
});
