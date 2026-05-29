<script>
  import Calculator from '$lib/components/Calculator.svelte';
</script>

<svelte:head>
  <title>Math Works</title>
  <meta
    name="description"
    content="Math Works coding challenge: an accessible calculator that adds, subtracts, multiplies, and divides two numbers, built with Svelte 5, SvelteKit, and shadcn-svelte."
  />
</svelte:head>

<section class="mx-auto mb-6 max-w-lg text-center" aria-labelledby="intro-heading">
  <h2 id="intro-heading" class="text-xl font-semibold">Add two numbers</h2>
  <p class="text-muted-foreground mt-1">
    Enter two numbers and choose an operation. The Math Works challenge is to add two numbers, and
    this calculator also supports subtraction, multiplication, and division.
  </p>
</section>

<Calculator />
