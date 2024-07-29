import { hash } from './hash'

export function transformWithBack(
  code: string,
  rules: RegExp[],
): [string, (newCode: string) => string] {
  const hashMap = new Map<string, string>()
  let result = code
  for (const rule of rules) {
    result = result.replace(rule, (all) => {
      if (hashMap.has(code))
        return hashMap.get(code)!

      const _hash = hash(all)
      hashMap.set(code, _hash)
      return _hash
    })
  }
  return [
    result,
    (newCode: string) =>
      Object.entries(hashMap).reduce(
        (result, [key, value]) => result.replaceAll(value, key),
        newCode,
      ),
  ]
}
