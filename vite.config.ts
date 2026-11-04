import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rolldownOptions: {
      input: {
      'planetarium': fileURLToPath(new URL('./planetarium.html', import.meta.url)),
      'atlas': fileURLToPath(new URL('./atlas.html', import.meta.url)),
      'observatory': fileURLToPath(new URL('./observatory.html', import.meta.url)),
      'sessions': fileURLToPath(new URL('./sessions.html', import.meta.url)),
      'mission-control': fileURLToPath(new URL('./mission-control.html', import.meta.url)),
      'preferences': fileURLToPath(new URL('./preferences.html', import.meta.url)),

        dashboard: fileURLToPath(new URL('./index.html', import.meta.url)),
        mission: fileURLToPath(new URL('./mission.html', import.meta.url)),
        studio: fileURLToPath(new URL('./studio.html', import.meta.url)),
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
