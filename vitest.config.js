import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    conditions: ['browser'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.js'],
    coverage: {
      provider: 'v8',
      include: ['src/js/calculator.js', 'src/components/**/*.svelte'],
      exclude: ['src/js/main.js', 'src/__tests__/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
