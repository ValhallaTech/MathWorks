/**
 * Pure, side-effect-free arithmetic for the Math Works challenge.
 *
 * This module has no DOM or framework dependencies so it can be unit-tested in
 * isolation. The Svelte UI imports {@link calculate} for safe, user-facing
 * evaluation, while the low-level operations ({@link add}, {@link subtract},
 * {@link multiply}, {@link divide}) are exported for direct testing.
 */

/** Supported operation identifiers. */
export const OPERATIONS = Object.freeze({
  add: 'add',
  subtract: 'subtract',
  multiply: 'multiply',
  divide: 'divide',
});

/**
 * Parse a raw input value (string from a form field, or a number) into a finite
 * JavaScript number.
 *
 * @param {string|number} value - The raw value to parse.
 * @returns {number} The parsed finite number.
 * @throws {Error} If the value is empty or not a valid finite number.
 */
export function parseNumber(value) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error('Value must be a finite number.');
    }
    return value;
  }

  if (value === null || value === undefined) {
    throw new Error('Please enter a number.');
  }

  const trimmed = String(value).trim();
  if (trimmed === '') {
    throw new Error('Please enter a number.');
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    throw new Error(`"${trimmed}" is not a valid number.`);
  }

  return parsed;
}

/**
 * Guard that both arguments are finite numbers.
 *
 * @param {number} a - First operand.
 * @param {number} b - Second operand.
 * @returns {void}
 * @throws {TypeError} If either operand is not a finite number.
 */
function assertNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Both operands must be finite numbers.');
  }
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The sum of {@link a} and {@link b}.
 */
export function add(a, b) {
  assertNumbers(a, b);
  return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The difference {@link a} minus {@link b}.
 */
export function subtract(a, b) {
  assertNumbers(a, b);
  return a - b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The product of {@link a} and {@link b}.
 */
export function multiply(a, b) {
  assertNumbers(a, b);
  return a * b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The quotient {@link a} divided by {@link b}.
 * @throws {Error} If {@link b} is zero.
 */
export function divide(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}

/** @type {Record<string, (a: number, b: number) => number>} */
const OPERATION_FNS = {
  [OPERATIONS.add]: add,
  [OPERATIONS.subtract]: subtract,
  [OPERATIONS.multiply]: multiply,
  [OPERATIONS.divide]: divide,
};

/**
 * Safely evaluate an operation against two raw input values. Never throws;
 * instead returns a discriminated result object suitable for driving UI state.
 *
 * @param {string} operation - One of {@link OPERATIONS}.
 * @param {string|number} rawA - First raw operand (e.g. a form field value).
 * @param {string|number} rawB - Second raw operand.
 * @returns {{ value: number|null, error: string|null }} Result of evaluation.
 */
export function calculate(operation, rawA, rawB) {
  const fn = OPERATION_FNS[operation];
  if (!fn) {
    return { value: null, error: `Unknown operation: "${operation}".` };
  }

  try {
    const a = parseNumber(rawA);
    const b = parseNumber(rawB);
    return { value: fn(a, b), error: null };
  } catch (err) {
    return { value: null, error: err instanceof Error ? err.message : String(err) };
  }
}
