import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    { enforce: 'pre', ...mdx() },
    react()
  ],
});
