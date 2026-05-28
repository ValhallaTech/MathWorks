/**
 * Application entry point.
 *
 * Mounts the root Svelte component into the `#app` element defined in
 * `index.html`. All arithmetic logic lives in the framework-agnostic
 * `calculator.js` module so it can be unit-tested in isolation.
 */
import { mount } from 'svelte';
import App from '../App.svelte';

const target = document.getElementById('app');

const app = mount(App, { target });

export default app;
