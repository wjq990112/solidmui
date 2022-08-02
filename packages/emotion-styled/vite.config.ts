import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseConfig from '../../vite.config';

export default defineConfig({
  ...baseConfig,
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SolidMuiEmotionStyled',
      formats: ['cjs', 'es', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js/*'],
    },
  },
});
