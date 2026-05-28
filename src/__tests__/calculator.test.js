import { describe, it, expect } from 'vitest';
import {
  OPERATIONS,
  parseNumber,
  add,
  subtract,
  multiply,
  divide,
  calculate,
} from '../js/calculator.js';

// ---------------------------------------------------------------------------
// OPERATIONS constant
// ---------------------------------------------------------------------------
describe('OPERATIONS', () => {
  it('is frozen (immutable)', () => {
    expect(Object.isFrozen(OPERATIONS)).toBe(true);
  });

  it('contains add, subtract, multiply, divide keys', () => {
    expect(OPERATIONS).toEqual({
      add: 'add',
      subtract: 'subtract',
      multiply: 'multiply',
      divide: 'divide',
    });
  });
});

// ---------------------------------------------------------------------------
// parseNumber
// ---------------------------------------------------------------------------
describe('parseNumber', () => {
  describe('valid inputs', () => {
    it('returns an integer passed as a number', () => {
      expect(parseNumber(42)).toBe(42);
    });

    it('returns a negative number passed as a number', () => {
      expect(parseNumber(-7)).toBe(-7);
    });

    it('returns zero', () => {
      expect(parseNumber(0)).toBe(0);
    });

    it('returns a decimal number', () => {
      expect(parseNumber(3.14)).toBeCloseTo(3.14);
    });

    it('parses a numeric string', () => {
      expect(parseNumber('5')).toBe(5);
    });

    it('parses a negative numeric string', () => {
      expect(parseNumber('-10')).toBe(-10);
    });

    it('parses a decimal string', () => {
      expect(parseNumber('2.5')).toBeCloseTo(2.5);
    });

    it('parses a numeric string with leading/trailing whitespace', () => {
      expect(parseNumber('  7  ')).toBe(7);
    });

    it('parses "0"', () => {
      expect(parseNumber('0')).toBe(0);
    });

    it('parses scientific notation string', () => {
      expect(parseNumber('1e3')).toBe(1000);
    });
  });

  describe('invalid inputs — should throw', () => {
    it('throws for an empty string', () => {
      expect(() => parseNumber('')).toThrow('Please enter a number.');
    });

    it('throws for a whitespace-only string', () => {
      expect(() => parseNumber('   ')).toThrow('Please enter a number.');
    });

    it('throws for null', () => {
      expect(() => parseNumber(null)).toThrow('Please enter a number.');
    });

    it('throws for undefined', () => {
      expect(() => parseNumber(undefined)).toThrow('Please enter a number.');
    });

    it('throws for a non-numeric string', () => {
      expect(() => parseNumber('abc')).toThrow('"abc" is not a valid number.');
    });

    it('throws for a mixed alphanumeric string', () => {
      expect(() => parseNumber('12abc')).toThrow(
        '"12abc" is not a valid number.'
      );
    });

    it('throws for Infinity passed as a number', () => {
      expect(() => parseNumber(Infinity)).toThrow(
        'Value must be a finite number.'
      );
    });

    it('throws for negative Infinity passed as a number', () => {
      expect(() => parseNumber(-Infinity)).toThrow(
        'Value must be a finite number.'
      );
    });

    it('throws for NaN passed as a number', () => {
      expect(() => parseNumber(NaN)).toThrow('Value must be a finite number.');
    });

    it('throws for the string "Infinity"', () => {
      expect(() => parseNumber('Infinity')).toThrow(
        '"Infinity" is not a valid number.'
      );
    });

    it('throws for the string "NaN"', () => {
      expect(() => parseNumber('NaN')).toThrow('"NaN" is not a valid number.');
    });
  });
});

// ---------------------------------------------------------------------------
// add
// ---------------------------------------------------------------------------
describe('add', () => {
  it('adds two positive integers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('adds a positive and a negative number', () => {
    expect(add(10, -4)).toBe(6);
  });

  it('adds two negative numbers', () => {
    expect(add(-3, -5)).toBe(-8);
  });

  it('adds two decimals', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it('returns the same number when adding zero', () => {
    expect(add(7, 0)).toBe(7);
  });

  it('throws a TypeError when a is not a finite number', () => {
    expect(() => add(Infinity, 1)).toThrow(TypeError);
  });

  it('throws a TypeError when b is not a finite number', () => {
    expect(() => add(1, NaN)).toThrow(TypeError);
  });
});

// ---------------------------------------------------------------------------
// subtract
// ---------------------------------------------------------------------------
describe('subtract', () => {
  it('subtracts two positive integers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  it('subtracts to produce a negative result', () => {
    expect(subtract(3, 8)).toBe(-5);
  });

  it('subtracts two negative numbers', () => {
    expect(subtract(-2, -5)).toBe(3);
  });

  it('subtracts decimals', () => {
    expect(subtract(1.5, 0.5)).toBeCloseTo(1.0);
  });

  it('returns zero when subtracting equal values', () => {
    expect(subtract(9, 9)).toBe(0);
  });

  it('throws a TypeError when a is Infinity', () => {
    expect(() => subtract(Infinity, 1)).toThrow(TypeError);
  });

  it('throws a TypeError when b is NaN', () => {
    expect(() => subtract(1, NaN)).toThrow(TypeError);
  });
});

// ---------------------------------------------------------------------------
// multiply
// ---------------------------------------------------------------------------
describe('multiply', () => {
  it('multiplies two positive integers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it('multiplies with a negative number', () => {
    expect(multiply(-3, 4)).toBe(-12);
  });

  it('multiplies two negative numbers', () => {
    expect(multiply(-3, -4)).toBe(12);
  });

  it('multiplies by zero', () => {
    expect(multiply(99, 0)).toBe(0);
  });

  it('multiplies decimals', () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });

  it('throws a TypeError when a is Infinity', () => {
    expect(() => multiply(Infinity, 2)).toThrow(TypeError);
  });

  it('throws a TypeError when b is NaN', () => {
    expect(() => multiply(2, NaN)).toThrow(TypeError);
  });
});

// ---------------------------------------------------------------------------
// divide
// ---------------------------------------------------------------------------
describe('divide', () => {
  it('divides two positive integers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('divides to produce a decimal result', () => {
    expect(divide(1, 4)).toBeCloseTo(0.25);
  });

  it('divides a negative by a positive', () => {
    expect(divide(-9, 3)).toBe(-3);
  });

  it('divides two negative numbers', () => {
    expect(divide(-8, -4)).toBe(2);
  });

  it('throws when dividing by zero', () => {
    expect(() => divide(5, 0)).toThrow('Cannot divide by zero.');
  });

  it('throws a TypeError when a is Infinity', () => {
    expect(() => divide(Infinity, 2)).toThrow(TypeError);
  });

  it('throws a TypeError when b is NaN', () => {
    expect(() => divide(4, NaN)).toThrow(TypeError);
  });
});

// ---------------------------------------------------------------------------
// calculate
// ---------------------------------------------------------------------------
describe('calculate', () => {
  describe('successful operations', () => {
    it('returns a value for add', () => {
      expect(calculate(OPERATIONS.add, '3', '4')).toEqual({
        value: 7,
        error: null,
      });
    });

    it('returns a value for subtract', () => {
      expect(calculate(OPERATIONS.subtract, '10', '3')).toEqual({
        value: 7,
        error: null,
      });
    });

    it('returns a value for multiply', () => {
      expect(calculate(OPERATIONS.multiply, '6', '7')).toEqual({
        value: 42,
        error: null,
      });
    });

    it('returns a value for divide', () => {
      expect(calculate(OPERATIONS.divide, '10', '2')).toEqual({
        value: 5,
        error: null,
      });
    });

    it('accepts raw number arguments', () => {
      expect(calculate(OPERATIONS.add, 5, 3)).toEqual({
        value: 8,
        error: null,
      });
    });

    it('handles decimal string inputs', () => {
      const result = calculate(OPERATIONS.multiply, '2.5', '4');
      expect(result.error).toBeNull();
      expect(result.value).toBeCloseTo(10);
    });

    it('handles negative string inputs', () => {
      expect(calculate(OPERATIONS.add, '-5', '3')).toEqual({
        value: -2,
        error: null,
      });
    });
  });

  describe('error cases — returns { value: null, error: string }', () => {
    it('returns an error for an unknown operation', () => {
      const result = calculate('modulo', '4', '2');
      expect(result.value).toBeNull();
      expect(result.error).toMatch(/Unknown operation/);
    });

    it('returns an error when rawA is empty', () => {
      const result = calculate(OPERATIONS.add, '', '5');
      expect(result.value).toBeNull();
      expect(result.error).toBe('Please enter a number.');
    });

    it('returns an error when rawB is empty', () => {
      const result = calculate(OPERATIONS.add, '5', '');
      expect(result.value).toBeNull();
      expect(result.error).toBe('Please enter a number.');
    });

    it('returns an error when rawA is non-numeric', () => {
      const result = calculate(OPERATIONS.add, 'foo', '5');
      expect(result.value).toBeNull();
      expect(result.error).toMatch(/"foo" is not a valid number/);
    });

    it('returns an error for divide-by-zero', () => {
      const result = calculate(OPERATIONS.divide, '8', '0');
      expect(result.value).toBeNull();
      expect(result.error).toBe('Cannot divide by zero.');
    });

    it('returns an error when rawA is null', () => {
      const result = calculate(OPERATIONS.add, null, '5');
      expect(result.value).toBeNull();
      expect(result.error).toBe('Please enter a number.');
    });

    it('returns an error when rawA is Infinity (the number)', () => {
      const result = calculate(OPERATIONS.add, Infinity, 5);
      expect(result.value).toBeNull();
      expect(result.error).toBeTruthy();
    });

    it('never throws — always returns a result object', () => {
      expect(() =>
        calculate(OPERATIONS.add, undefined, undefined)
      ).not.toThrow();
    });
  });
});
