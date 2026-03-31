import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src')
    }
  },
  build: {
    outDir: '../priv/static/assets',
    emptyOutDir: true,
    sourcemap: true,
    manifest: true
  }
});
