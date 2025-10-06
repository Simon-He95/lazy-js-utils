import { hash } from './hash'

/**
 * Replace matched parts of `code` (by provided regex rules) with stable hashes
 * and return a restore function that converts the hashes back to original
 * fragments. This is useful to protect segments during formatting or
 * transformations.
 *
 * @param code - Original code string to transform
 * @param rules - Array of RegExp rules to match fragments to replace
 * @returns A tuple: [transformedCode, restoreFunction]
 *
 * @example
 * ```ts
 * const code = 'const str = "hello world"; const num = 123;';
 * const rules = [/"[^"]*"/g, /\d+/g]; // match strings and numbers
 * const [transformed, restore] = transformWithBack(code, rules);
 * // process transformed...
 * const final = restore(transformed)
 * ```
 */
export function transformWithBack(
  code: string,
  rules: RegExp[],
): [string, (newCode: string) => string] {
  const hashMap = new Map<string, string>()
  let result = code
  for (const rule of rules) {
    result = result.replace(rule, (all) => {
      if (hashMap.has(all))
        return hashMap.get(all)!

      const _hash = hash(all)
      hashMap.set(all, _hash)
      return _hash
    })
  }
  return [
    result,
    (newCode: string) => {
      let replaced = newCode
      // Iterate the original map to restore original fragments
      for (const [key, value] of hashMap.entries()) {
        replaced = replaced.replaceAll(value, key)
      }
      return replaced
    },
  ]
}
