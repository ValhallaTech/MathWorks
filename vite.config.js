import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// `process` is provided by Node when this config is loaded; reference it via
// `globalThis` (cast to `any`) so we don't need to depend on `@types/node`
// solely for this check. Runtime behavior is unchanged.
const isVitest = Boolean(/** @type {any} */ (globalThis).process?.env?.VITEST);

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  // @testing-library/svelte needs the browser build of Svelte under jsdom.
  resolve: isVitest
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
