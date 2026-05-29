<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { ModeWatcher, toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button/index.js';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />

<a
  href="#main"
  class="bg-primary text-primary-foreground sr-only z-50 rounded-br-md px-4 py-2 focus:not-sr-only focus:absolute focus:left-0 focus:top-0"
>
  Skip to main content
</a>

<header class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
  <h1 class="text-2xl font-bold tracking-tight">Math Works</h1>
  <Button onclick={toggleMode} variant="outline" size="icon" aria-label="Toggle dark mode">
    <SunIcon class="size-5 dark:hidden" />
    <MoonIcon class="hidden size-5 dark:block" />
  </Button>
</header>

<main id="main" class="px-4 pb-16 pt-2 sm:px-6">
  {@render children()}
</main>
