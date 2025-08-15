import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for web + Electron packaging
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: relative paths so the packaged Electron app (file://) can find assets
  base: './',
  server: { port: 5173, strictPort: true },
  build: { outDir: 'dist' }
});
