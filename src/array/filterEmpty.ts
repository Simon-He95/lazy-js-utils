/**
/**
 * 过滤数组中的空值（falsey 值）
 * @description EN: Remove empty/falsey values from an array (filters with Boolean).
 * @param {T[]} array Input array.
 * @returns {T[]} Filtered array with truthy values only.
 */
export function filterEmpty<T>(array: T[]) {
  return array.filter(Boolean)
}
