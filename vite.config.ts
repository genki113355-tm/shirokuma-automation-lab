import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    { 
      enforce: 'pre', 
      ...mdx({
        remarkPlugins: [remarkGfm]
      }) 
    },
    react()
  ],
});
