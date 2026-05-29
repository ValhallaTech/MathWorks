[![Netlify Status](https://api.netlify.com/api/v1/badges/60dacf60-4d64-424c-8120-79c9dfcb5a56/deploy-status)](https://app.netlify.com/projects/fs3mathworks/deploys)

# Math Works

> Accessible implementation of the **Math Works** coding challenge: add two numbers, built with [Svelte 5](https://svelte.dev/) and [SvelteKit](https://svelte.dev/docs/kit) on [Vite](https://vite.dev/), styled with [shadcn-svelte](https://shadcn-svelte.com/) and [Tailwind CSS](https://tailwindcss.com/), deployed to [Netlify](https://www.netlify.com/).

## About

The Math Works challenge asks for a simple web page that takes two numbers and
returns their sum. This project modernizes that challenge as a small, accessible
Svelte single-page app. In addition to addition, the calculator also supports
subtraction, multiplication, and division, with clear validation and screen
reader friendly feedback.

## Features

- **Svelte 5 UI** with framework-agnostic, unit-tested arithmetic logic
- **SvelteKit 2 + Vite** application bundled to static assets via `@sveltejs/adapter-netlify`
- **shadcn-svelte / bits-ui** components styled with **Tailwind CSS v4**
- **Accessible (WCAG 2.1 AA):** skip link, labelled inputs, `aria-live` results,
  `role="alert"` errors, visible focus styles, and `prefers-reduced-motion` support
- **Vitest** unit tests with an 80% coverage gate
- **CI pipeline** that lints, type/Svelte-checks, tests, and builds on every push and pull request
- **Renovate** dependency automation (npm + GitHub Actions)
- **Netlify** deployment via `netlify.toml`

## Prerequisites

- Node.js 24.x (see `.nvmrc`)
- Yarn 4.x (managed via Corepack / `packageManager` in `package.json`)

```bash
corepack enable
```

## Getting Started

```bash
# Install dependencies
yarn install

# Start the dev server (http://localhost:5173)
yarn dev

# Production build to build/
yarn build

# Preview the production build locally
yarn preview

# Run unit tests
yarn test

# Run tests with coverage
yarn test:coverage

# Type & Svelte check
yarn check

# Lint and format
yarn lint
yarn format
```

## Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `yarn dev`           | Start the Vite dev server (http://localhost:5173) |
| `yarn build`         | Production build to `build/`                      |
| `yarn preview`       | Preview the production build locally              |
| `yarn check`         | Run `svelte-kit sync` and `svelte-check`          |
| `yarn clean`         | Remove `build`, `.svelte-kit`, and `.netlify`     |
| `yarn lint`          | Lint with ESLint                                  |
| `yarn format`        | Format source with Prettier                       |
| `yarn test`          | Run Vitest unit tests                             |
| `yarn test:coverage` | Run tests with coverage report                    |

## Project Structure

```
MathWorks/
├── src/
│   ├── app.html                       # HTML template
│   ├── app.css                        # Global, accessible styles (Tailwind)
│   ├── app.d.ts                       # Ambient type declarations
│   ├── routes/
│   │   ├── +layout.js                 # Root layout load/config
│   │   ├── +layout.svelte             # Root layout component
│   │   └── +page.svelte               # Home page
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Calculator.svelte       # Calculator UI
│   │   │   └── ui/                     # shadcn-svelte components
│   │   │       ├── button/
│   │   │       ├── card/
│   │   │       ├── input/
│   │   │       ├── label/
│   │   │       ├── select/
│   │   │       └── separator/
│   │   ├── utils.js                   # Shared utilities (cn, etc.)
│   │   └── assets/
│   │       └── favicon.svg
│   ├── js/
│   │   └── calculator.js              # Pure, testable arithmetic logic
│   └── __tests__/                     # Vitest unit tests
│       ├── Calculator.test.js
│       ├── calculator.test.js
│       └── setup.js
├── static/                            # Static assets (robots.txt, etc.)
├── .github/workflows/
│   ├── ci.yml                         # Lint + check + test:coverage + build
│   └── sync-runtime-versions.yml      # Keeps Node/Yarn pins in sync
├── netlify.toml                       # Netlify build configuration
├── renovate.json                      # Renovate dependency automation
├── svelte.config.js                   # SvelteKit + adapter-netlify config
├── vite.config.js                     # Vite + Vitest config
├── components.json                    # shadcn-svelte config
├── eslint.config.js                   # ESLint flat config
├── jsconfig.json                      # JS/TS project config
├── package.json
└── README.md
```

## Accessibility

This project targets **WCAG 2.1 AA**:

- Semantic landmarks (`header`, `main`) and a skip-to-content link
- Every input has an associated `<label>`; the result uses `aria-live="polite"`
- Validation errors are announced via `role="alert"` and linked with `aria-describedby`
- Sufficient color contrast in both light and dark color schemes
- Fully keyboard operable with visible focus indicators
- Honors `prefers-reduced-motion`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Netlify deployment instructions.

## License

MIT — see [LICENSE](LICENSE).
