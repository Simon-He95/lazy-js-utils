import { hash } from './hash'

/**
 * 根据正则规则将代码中的匹配部分转换为哈希值，并返回还原函数
 *
 * 这个函数主要用于需要临时替换代码中某些部分，处理后再还原的场景。
 * 例如：在代码格式化、语法解析等过程中保护特定的代码片段不被修改。
 *
 * @param {string} code - 需要处理的原始代码字符串
 * @param {RegExp[]} rules - 正则表达式数组，用于匹配需要转换的代码片段
 * @returns {[string, (newCode: string) => string]} 返回一个元组：
 *   - 第一个元素：转换后的代码字符串（匹配的部分被替换为哈希值）
 *   - 第二个元素：还原函数，接收处理后的代码，将哈希值还原为原始内容
 *
 * @example
 * ```typescript
 * const code = 'const str = "hello world"; const num = 123;';
 * const rules = [/"[^"]*"/g, /\d+/g]; // 匹配字符串和数字
 *
 * const [transformed, restore] = transformWithBack(code, rules);
 * console.log(transformed); // 'const str = hash1; const num = hash2;'
 *
 * // 对转换后的代码进行一些处理...
 * const processedCode = transformed.replace(/const/g, 'let');
 *
 * // 还原原始内容
 * const finalCode = restore(processedCode);
 * console.log(finalCode); // 'let str = "hello world"; let num = 123;'
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
      // 注意：这里应该检查 hashMap.has(all) 而不是 hashMap.has(code)
      if (hashMap.has(all))
        return hashMap.get(all)!

      const _hash = hash(all)
      hashMap.set(all, _hash) // 这里也应该是 all 而不是 code
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
