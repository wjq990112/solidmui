import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseConfig from '../../vite.config';

export default defineConfig({
  ...baseConfig,
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'SolidMui',
      formats: ['cjs', 'es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});
