// ESLint flat configuration (ESLint 9/10) for the Math Works SvelteKit app.
// Lints plain JavaScript modules and Svelte 5 single-file components under
// `src/`. Generated build artifacts and vendored shadcn-svelte UI primitives
// are ignored.

import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
  includeIgnoreFile(gitignorePath),

  // Vendored shadcn-svelte primitives are generated code; don't lint them.
  {
    ignores: ['src/lib/components/ui/**', '.svelte-kit/**', 'build/**', '.netlify/**'],
  },

  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: { svelteConfig },
    },
  },

  // Test files — add Vitest globals so ESLint doesn't flag them as undefined.
  {
    files: ['src/__tests__/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
  },
];
