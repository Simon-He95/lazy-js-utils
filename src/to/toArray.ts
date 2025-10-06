import { isArray } from './../is/isArray'

/**
 * Ensure value is an array. If input is already an array it is returned as-is;
 * otherwise the value is wrapped in a single-element array.
 *
 * @param array - Value or array of values.
 * @returns An array containing the original value(s).
 */
export function toArray<T>(array: T) {
  return isArray(array) ? array : [array]
}
