import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Conditionally join Tailwind classes, with conflicting utilities merged.
 *
 * @param {import('clsx').ClassValue[]} inputs - Class values to combine.
 * @returns {string} The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Adds an optional `ref` to a component's props, mirroring the helper used by
 * the shadcn-svelte registry.
 *
 * @template T
 * @template {HTMLElement} [U=HTMLElement]
 * @typedef {T & { ref?: U | null }} WithElementRef
 */

/**
 * @template T
 * @typedef {T extends { child?: any } ? Omit<T, 'child'> : T} WithoutChild
 */

/**
 * @template T
 * @typedef {T extends { children?: any } ? Omit<T, 'children'> : T} WithoutChildren
 */

/**
 * @template T
 * @typedef {WithoutChildren<WithoutChild<T>>} WithoutChildrenOrChild
 */
