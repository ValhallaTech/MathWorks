<script>
  import { calculate, OPERATIONS } from '../js/calculator.js';

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

<form class="calculator" novalidate onsubmit={onSubmit} onreset={onReset}>
  <fieldset>
    <legend>Calculator</legend>

    <div class="field">
      <label for="num1">Number 1</label>
      <input
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

    <div class="field">
      <label for="operation">Operation</label>
      <select id="operation" name="operation" bind:value={operation}>
        {#each Object.values(OPERATIONS) as op}
          <option value={op}>{operationLabels[op]}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <label for="num2">Number 2</label>
      <input
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

    <div class="actions">
      <button type="submit" class="btn btn-primary">Calculate</button>
      <button type="reset" class="btn btn-secondary">Clear</button>
    </div>
  </fieldset>

  <div class="field result-field">
    <label for="result">Result</label>
    <output
      id="result"
      name="result"
      for="num1 operation num2"
      aria-live="polite"
    >{result === null ? '' : result}</output>
  </div>

  <p id="calc-error" class="error" role="alert">{error}</p>
</form>

<style>
  .calculator {
    max-width: 32rem;
    margin: 0 auto;
  }

  fieldset {
    border: 1px solid var(--border-color, #6b6b6b);
    border-radius: 0.5rem;
    padding: 1rem 1.25rem 1.25rem;
  }

  legend {
    font-weight: 600;
    padding: 0 0.5rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1rem;
  }

  label {
    font-weight: 600;
  }

  input,
  select,
  output {
    font-size: 1rem;
    padding: 0.5rem 0.6rem;
    border: 1px solid var(--border-color, #6b6b6b);
    border-radius: 0.35rem;
    background: var(--input-bg, #ffffff);
    color: inherit;
  }

  output {
    display: block;
    min-height: 1.5rem;
    background: var(--result-bg, #eef4ff);
    font-variant-numeric: tabular-nums;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.55rem 1.1rem;
    border-radius: 0.35rem;
    border: 1px solid transparent;
    cursor: pointer;
  }

  .btn-primary {
    background: var(--primary, #0b5cd6);
    color: #ffffff;
  }

  .btn-secondary {
    background: transparent;
    color: inherit;
    border-color: var(--border-color, #6b6b6b);
  }

  .result-field {
    margin-top: 1.25rem;
  }

  .error {
    color: var(--error-color, #b00020);
    font-weight: 600;
    min-height: 1.25rem;
    margin: 0.5rem 0 0;
  }

  .btn:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 3px solid var(--focus-color, #ffbf47);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      transition: none !important;
    }
  }
</style>
