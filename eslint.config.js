'use strict';

// ESLint flat configuration (ESLint 9/10) for the Math Works browser app.
// Lints plain JavaScript modules under `src/`. Svelte single-file components
// are compiled by Parcel and are linted at build time by the Svelte compiler.

module.exports = [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  // Test files — add Vitest and jsdom globals so ESLint doesn't flag them as
  // undefined. Rules intentionally inherit from the block above; no weakening.
  {
    files: ['src/__tests__/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Vitest globals (enabled via test.globals = true in vitest.config.js)
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
        // jsdom browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
