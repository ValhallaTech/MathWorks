import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Calculator from '../lib/components/Calculator.svelte';

// @testing-library/svelte uses Svelte's mount/unmount — clean up after each test.
beforeEach(() => {
  cleanup();
});

// bits-ui's Select applies a scroll lock that leaves `pointer-events: none` on
// <body> after closing under jsdom; disable the pointer-events assertion so
// follow-up interactions (typing, clicking) still work.
/**
 * @param {Parameters<typeof userEvent.setup>[0]} [options]
 * @returns {ReturnType<typeof userEvent.setup>}
 */
const setup = (options) => userEvent.setup({ pointerEventsCheck: 0, ...options });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Fill both number inputs and click Calculate.
 * @param {string|number} num1
 * @param {string|number} num2
 */
async function calculate(num1, num2) {
  const user = setup();
  await user.clear(screen.getByLabelText('Number 1'));
  await user.type(screen.getByLabelText('Number 1'), String(num1));
  await user.clear(screen.getByLabelText('Number 2'));
  await user.type(screen.getByLabelText('Number 2'), String(num2));
  await user.click(screen.getByRole('button', { name: /calculate/i }));
}

/**
 * Open the shadcn-svelte (bits-ui) Select and choose an operation via the
 * keyboard. bits-ui renders its listbox in a floating portal that stays
 * `visibility: hidden` under jsdom (no layout engine), so pointer clicks on
 * options don't register — but the component's keyboard handlers work reliably.
 * Operation order in the UI is: add(0), subtract(1), multiply(2), divide(3).
 * @param {number} steps
 */
async function selectOperation(steps) {
  const user = setup();
  const trigger = screen.getByLabelText('Operation');
  trigger.focus();
  // Enter opens the listbox with the highlight on the current value (add).
  await user.keyboard('{Enter}');
  await user.keyboard('{ArrowDown}'.repeat(steps) + '{Enter}');
}

const STEPS = { subtract: 1, multiply: 2, divide: 3 };

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('Calculator — rendering', () => {
  it('renders the Number 1 input', () => {
    render(Calculator);
    expect(screen.getByLabelText('Number 1')).toBeInTheDocument();
  });

  it('renders the Number 2 input', () => {
    render(Calculator);
    expect(screen.getByLabelText('Number 2')).toBeInTheDocument();
  });

  it('renders the operation select', () => {
    render(Calculator);
    expect(screen.getByLabelText('Operation')).toBeInTheDocument();
  });

  it('renders the Calculate button', () => {
    render(Calculator);
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  it('renders the Clear button', () => {
    render(Calculator);
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('renders the result output initially empty', () => {
    render(Calculator);
    expect(screen.getByRole('status')).toHaveTextContent('');
  });
});

// ---------------------------------------------------------------------------
// Add operation
// ---------------------------------------------------------------------------

describe('Calculator — add operation', () => {
  it('displays the sum when Calculate is clicked', async () => {
    render(Calculator);
    await calculate(3, 4);
    expect(screen.getByRole('status')).toHaveTextContent('7');
  });

  it('handles negative numbers', async () => {
    render(Calculator);
    await calculate(-5, 3);
    expect(screen.getByRole('status')).toHaveTextContent('-2');
  });

  it('handles decimal numbers', async () => {
    render(Calculator);
    await calculate(1.5, 2.5);
    expect(screen.getByRole('status')).toHaveTextContent('4');
  });

  it('clears any previous error on a successful calculation', async () => {
    render(Calculator);
    // First trigger an error
    const user = setup();
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByRole('alert')).not.toHaveTextContent('');
    // Then do a valid calculation
    await calculate(1, 2);
    expect(screen.getByRole('alert')).toHaveTextContent('');
  });
});

// ---------------------------------------------------------------------------
// Operation select
// ---------------------------------------------------------------------------

describe('Calculator — operation select', () => {
  it('multiplies when the Multiply operation is chosen', async () => {
    render(Calculator);
    await selectOperation(STEPS.multiply);
    await calculate(6, 7);
    expect(screen.getByRole('status')).toHaveTextContent('42');
  });

  it('subtracts when the Subtract operation is chosen', async () => {
    render(Calculator);
    await selectOperation(STEPS.subtract);
    await calculate(10, 3);
    expect(screen.getByRole('status')).toHaveTextContent('7');
  });

  it('divides when the Divide operation is chosen', async () => {
    render(Calculator);
    await selectOperation(STEPS.divide);
    await calculate(12, 4);
    expect(screen.getByRole('status')).toHaveTextContent('3');
  });
});

// ---------------------------------------------------------------------------
// Error cases
// ---------------------------------------------------------------------------

describe('Calculator — error handling', () => {
  it('shows an alert when Number 1 is empty', async () => {
    render(Calculator);
    const user = setup();
    // Leave both inputs empty and click Calculate
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    const alert = screen.getByRole('alert');
    expect(alert).not.toHaveTextContent('');
  });

  it('shows an alert when Number 2 is empty', async () => {
    render(Calculator);
    const user = setup();
    await user.type(screen.getByLabelText('Number 1'), '5');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByRole('alert')).not.toHaveTextContent('');
  });

  it('shows a divide-by-zero error', async () => {
    render(Calculator);
    await selectOperation(STEPS.divide);
    await calculate(8, 0);
    expect(screen.getByRole('alert')).toHaveTextContent(/divide by zero/i);
  });

  it('clears the result output when an error occurs', async () => {
    render(Calculator);
    // First do a valid calculation
    await calculate(2, 3);
    expect(screen.getByRole('status')).toHaveTextContent('5');
    // Now trigger an error
    const user = setup();
    await user.clear(screen.getByLabelText('Number 1'));
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByRole('status')).toHaveTextContent('');
  });
});

// ---------------------------------------------------------------------------
// Clear button
// ---------------------------------------------------------------------------

describe('Calculator — Clear button', () => {
  it('resets Number 1 to empty', async () => {
    render(Calculator);
    await calculate(5, 3);
    await setup().click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByLabelText('Number 1')).toHaveValue(null);
  });

  it('resets Number 2 to empty', async () => {
    render(Calculator);
    await calculate(5, 3);
    await setup().click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByLabelText('Number 2')).toHaveValue(null);
  });

  it('clears the result output', async () => {
    render(Calculator);
    await calculate(5, 3);
    expect(screen.getByRole('status')).toHaveTextContent('8');
    await setup().click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('clears the error alert', async () => {
    render(Calculator);
    const user = setup();
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(screen.getByRole('alert')).not.toHaveTextContent('');
    await setup().click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByRole('alert')).toHaveTextContent('');
  });

  it('resets the operation back to Add', async () => {
    render(Calculator);
    await selectOperation(STEPS.multiply);
    expect(screen.getByLabelText('Operation')).toHaveTextContent(/multiply/i);
    await setup().click(screen.getByRole('button', { name: /clear/i }));
    expect(screen.getByLabelText('Operation')).toHaveTextContent(/add/i);
  });
});
