/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

const isCI = process.env.CI === 'true';

export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  test: {
    coverage: {
      reporter: isCI ? 'json' : 'text',
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'setupTests.ts')],
    transformMode: {
      web: [/\.(j|t)sx?$/],
    },
    deps: {
      inline: [/solid-js/],
    },
  },
  plugins: [solid(), dts()],
});
