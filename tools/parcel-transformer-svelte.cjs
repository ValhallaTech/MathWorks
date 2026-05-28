'use strict';

// Local Parcel transformer for Svelte 5 single-file components.
//
// There is no maintained first-party/community Parcel transformer that targets
// the Svelte 5 compiler API, so this small plugin bridges the two. It compiles
// `*.svelte` files to a JavaScript module using `svelte/compiler` and lets
// Parcel bundle the resulting JS (and the Svelte runtime it imports) as usual.
//
// `css: 'injected'` keeps things simple and robust: the compiler appends the
// component's scoped styles to the JS output, so no separate CSS asset graph
// wiring is required.

const { Transformer } = require('@parcel/plugin');

// `svelte/compiler` is published as ESM only, so it must be loaded with a
// dynamic import from this CommonJS plugin. Cache the promise across calls.
let compilerPromise;
function getCompiler() {
  if (!compilerPromise) {
    compilerPromise = import('svelte/compiler');
  }
  return compilerPromise;
}

module.exports = new Transformer({
  async transform({ asset, options }) {
    const source = await asset.getCode();
    const { compile } = await getCompiler();

    const { js, warnings } = compile(source, {
      filename: asset.filePath,
      generate: 'client',
      css: 'injected',
      dev: options.mode !== 'production',
    });

    for (const warning of warnings) {
      // Surface compiler/a11y warnings in the Parcel build output.
      // eslint-disable-next-line no-console
      console.warn(`[svelte] ${asset.filePath}: ${warning.message}`);
    }

    asset.type = 'js';
    asset.setCode(js.code);

    return [asset];
  },
});
