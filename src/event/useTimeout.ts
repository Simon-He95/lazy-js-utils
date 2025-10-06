import { isFn } from '../is/isFn'
import type { UseTimeoutReturn } from '../types'

/**
 * Run a function once after a delay and return a stop function.
 * If fn is not a function, undefined is returned.
 *
 * @param fn - Function to run after the delay
 * @param duration - Delay in milliseconds (default 0)
 * @returns A function that clears the timeout, or undefined if fn is not a function
 */
export function useTimeout<T>(fn: T, duration = 0): UseTimeoutReturn<T> {
  if (!isFn(fn))
    return undefined as any
  const timer = setTimeout(fn, duration)
  return (() => clearTimeout(timer)) as any
}
