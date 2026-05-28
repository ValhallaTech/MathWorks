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
];
