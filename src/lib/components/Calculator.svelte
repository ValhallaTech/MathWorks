<script>
  import { calculate, OPERATIONS } from '../../js/calculator.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as Select from '$lib/components/ui/select/index.js';
  import * as Card from '$lib/components/ui/card/index.js';

  const operationLabels = {
    [OPERATIONS.add]: 'Add',
    [OPERATIONS.subtract]: 'Subtract',
    [OPERATIONS.multiply]: 'Multiply',
    [OPERATIONS.divide]: 'Divide',
  };

  let num1 = $state('');
  let num2 = $state('');
  let operation = $state(OPERATIONS.add);
  let result = $state(null);
  let error = $state('');

  const triggerLabel = $derived(operationLabels[operation] ?? 'Select operation');

  function onSubmit(event) {
    event.preventDefault();
    const outcome = calculate(operation, num1, num2);
    if (outcome.error) {
      error = outcome.error;
      result = null;
    } else {
      error = '';
      result = outcome.value;
    }
  }

  function onReset() {
    num1 = '';
    num2 = '';
    operation = OPERATIONS.add;
    result = null;
    error = '';
  }
</script>

<Card.Root class="mx-auto w-full max-w-lg">
  <Card.Header>
    <Card.Title>Calculator</Card.Title>
    <Card.Description>Enter two numbers and choose an operation.</Card.Description>
  </Card.Header>
  <Card.Content>
    <form novalidate class="flex flex-col gap-4" onsubmit={onSubmit}>
      <div class="flex flex-col gap-1.5">
        <Label for="num1">Number 1</Label>
        <Input
          id="num1"
          name="num1"
          type="number"
          inputmode="decimal"
          step="any"
          autocomplete="off"
          bind:value={num1}
          aria-describedby={error ? 'calc-error' : undefined}
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <Label for="operation">Operation</Label>
        <Select.Root type="single" name="operation" bind:value={operation}>
          <Select.Trigger id="operation" class="w-full">
            {triggerLabel}
          </Select.Trigger>
          <Select.Content>
            {#each Object.values(OPERATIONS) as op (op)}
              <Select.Item value={op} label={operationLabels[op]}>
                {operationLabels[op]}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>

      <div class="flex flex-col gap-1.5">
        <Label for="num2">Number 2</Label>
        <Input
          id="num2"
          name="num2"
          type="number"
          inputmode="decimal"
          step="any"
          autocomplete="off"
          bind:value={num2}
          aria-describedby={error ? 'calc-error' : undefined}
        />
      </div>

      <div class="flex gap-3">
        <Button type="submit">Calculate</Button>
        <Button type="button" variant="outline" onclick={onReset}>Clear</Button>
      </div>

      <div class="flex flex-col gap-1.5">
        <Label for="result">Result</Label>
        <output
          id="result"
          name="result"
          for="num1 operation num2"
          aria-live="polite"
          class="bg-muted text-foreground min-h-9 rounded-md border px-2.5 py-2 text-sm tabular-nums"
          >{result === null ? '' : result}</output
        >
      </div>

      <p id="calc-error" class="text-destructive min-h-5 text-sm font-semibold" role="alert">
        {error}
      </p>
    </form>
  </Card.Content>
</Card.Root>
