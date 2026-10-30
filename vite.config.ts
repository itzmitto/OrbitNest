import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions: {
      input: {
        dashboard: fileURLToPath(new URL('./index.html', import.meta.url)),
        background: fileURLToPath(new URL('./src/extension/background.ts', import.meta.url)),
      },
      output: {
        entryFileNames(chunk) {
          return chunk.name === 'background' ? 'background.js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
