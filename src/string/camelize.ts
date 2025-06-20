/**
 * 将xx-xx转为xxXx小驼峰或XxXx大驼峰格式
 * @param {string} s 字符串
 * @param {boolean} [pascalCase] 是否返回大驼峰格式(PascalCase)
 * @returns {string} 驼峰格式字符串
 */
export function camelize(s: string, pascalCase?: boolean): string {
  const camelized = s.replace(/-(\w)/g, (_all, letter) => letter.toUpperCase())

  if (pascalCase) {
    return camelized.charAt(0).toUpperCase() + camelized.slice(1)
  }

  return camelized
}
