/**
 * 将大驼峰转为xx-xx
 * @param { string } s 字符串
 * @returns string
 */
/**
 * Convert a PascalCase or camelCase string to kebab-case (hyphen-separated).
 *
 * Example: "MyVariableName" -> "my-variable-name"
 *
 * @param s - input string in camelCase or PascalCase
 * @returns the hyphenated (kebab-case) string
 * @description EN: Convert camelCase or PascalCase to kebab-case.
 */
export function hyphenate(s: string): string {
  return s.replace(/([A-Z])/g, '-$1').toLowerCase()
}
