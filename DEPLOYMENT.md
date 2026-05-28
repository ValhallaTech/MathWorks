# Deployment Guide — Math Works

## Infrastructure Snapshot

- Node.js version: `.nvmrc` (24.x)
- Yarn version: `packageManager` in `package.json` / `netlify.toml` (4.x)
- Build command: `yarn build`
- Publish directory: `dist`

These pins are kept in sync automatically by the **Sync Runtime Versions**
workflow and dependency updates by **Renovate**.

## Deploy from GitHub (Recommended)

1. Push your branch to GitHub.
2. In Netlify, import/connect the `ValhallaTech/MathWorks` repository.
3. Confirm build settings:
   - Build command: `yarn build`
   - Publish directory: `dist`
4. Deploy the site. Netlify auto-deploys on subsequent pushes.

## Deploy with the Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Pre-Deploy Validation

```bash
yarn install
yarn lint
yarn test
yarn build
```

## Post-Deploy Checks

- Load `/` and confirm the calculator renders.
- Enter two numbers, choose an operation, and verify the result.
- Confirm validation errors are announced and the keyboard/skip link work.
