/**
 * Convert a kebab-case string (hyphen-separated) to camelCase or PascalCase.
 *
 * Examples:
 *  - camelize('my-variable') => 'myVariable'
 *  - camelize('my-variable', true) => 'MyVariable'
 *
 * @param s - input string in kebab-case
 * @param pascalCase - if true, return PascalCase (first letter capitalized)
 * @returns the camelized string
 */
export function camelize(s: string, pascalCase?: boolean): string {
  const camelized = s.replace(/-(\w)/g, (_all, letter) => letter.toUpperCase())

  if (pascalCase) {
    return camelized.charAt(0).toUpperCase() + camelized.slice(1)
  }

  return camelized
}
