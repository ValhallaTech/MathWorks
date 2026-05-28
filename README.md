# Math Works

> Accessible implementation of the **Math Works** coding challenge: add two numbers, built with [Svelte](https://svelte.dev/) and bundled with [Parcel](https://parceljs.org/), deployed to [Netlify](https://www.netlify.com/).

## About

The Math Works challenge asks for a simple web page that takes two numbers and
returns their sum. This project modernizes that challenge as a small, accessible
Svelte single-page app. In addition to addition, the calculator also supports
subtraction, multiplication, and division, with clear validation and screen
reader friendly feedback.

## Features

- **Svelte 5 UI** with framework-agnostic, unit-tested arithmetic logic
- **Accessible (WCAG 2.1 AA):** skip link, labelled inputs, `aria-live` results,
  `role="alert"` errors, visible focus styles, and `prefers-reduced-motion` support
- **Parcel** zero-config bundling to a static `dist/` directory
- **Vitest** unit tests with an 80% coverage gate
- **CI pipeline** that lints, tests, and builds on every push and pull request
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

# Start the dev server (http://localhost:1234)
yarn dev

# Production build to dist/
yarn build

# Run unit tests
yarn test

# Run tests with coverage
yarn test:coverage

# Lint and format
yarn lint
yarn format
```

## Scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `yarn dev`           | Start Parcel dev server                      |
| `yarn build`         | Production build to `dist/`                   |
| `yarn clean`         | Remove `dist/` and `.parcel-cache/`          |
| `yarn lint`          | Lint JavaScript with ESLint                   |
| `yarn format`        | Format source with Prettier                   |
| `yarn test`          | Run Vitest unit tests                         |
| `yarn test:coverage` | Run tests with coverage report               |

## Project Structure

```
MathWorks/
├── src/
│   ├── index.html                 # Parcel entry HTML
│   ├── App.svelte                 # Root component
│   ├── components/
│   │   └── Calculator.svelte      # Calculator UI
│   ├── js/
│   │   ├── main.js                # Mounts the Svelte app
│   │   └── calculator.js          # Pure, testable arithmetic logic
│   ├── styles/
│   │   └── main.css               # Global, accessible styles
│   └── __tests__/                 # Vitest unit tests
├── tools/
│   └── parcel-transformer-svelte.cjs  # Parcel <-> Svelte 5 compiler bridge
├── .github/workflows/ci.yml       # Lint + test + build pipeline
├── netlify.toml                   # Netlify build configuration
├── renovate.json                  # Renovate dependency automation
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
