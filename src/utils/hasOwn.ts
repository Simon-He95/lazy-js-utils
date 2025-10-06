/**
 * Check whether object has own property `key`.
 *
 * @param {object} obj Object to test.
 * @param {string} key Property name.
 * @returns {boolean} True if object has own property `key`.
 */
export function hasOwn(obj: object, key: string): boolean {
  return Reflect.has(obj, key)
}
