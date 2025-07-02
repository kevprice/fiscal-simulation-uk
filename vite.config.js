import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/fiscal-simulation-uk/', // ⚠️ MUST MATCH your repo name
  plugins: [react()]
});
