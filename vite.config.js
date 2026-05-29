import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // @testing-library/svelte needs the browser build of Svelte under jsdom.
  resolve: process.env.VITEST
    ? { conditions: ['browser'] }
    : undefined,
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.js'],
    include: ['src/__tests__/**/*.{test,spec}.js'],
    coverage: {
      provider: 'v8',
      include: ['src/js/calculator.js', 'src/lib/components/Calculator.svelte'],
      exclude: ['src/**/*.{test,spec}.js', 'src/__tests__/**'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
