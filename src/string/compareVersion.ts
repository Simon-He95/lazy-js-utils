import type { ComparisonOperator } from '../types'

/**
 * Compare two semantic version strings (dot-separated numeric parts).
 *
 * Without an operator returns -1, 0, or 1. With an operator it returns a
 * boolean result of the comparison.
 *
 * @param version1 - first version string (e.g. '1.2.3')
 * @param version2 - second version string
 * @param operator - optional comparison operator ('>', '<', '=', '>=', '<=', '!=')
 * @returns number (-1, 0, 1) when operator is omitted, otherwise boolean
 */
export function compareVersion(version1: string, version2: string): number
export function compareVersion(
  version1: string,
  version2: string,
  operator: ComparisonOperator,
): boolean
export function compareVersion(
  version1: string,
  version2: string,
  operator?: ComparisonOperator,
): number | boolean {
  const v1Parts = version1.split('.').map(Number)
  const v2Parts = version2.split('.').map(Number)

  const maxLength = Math.max(v1Parts.length, v2Parts.length)

  // Pad shorter version with zeros
  while (v1Parts.length < maxLength) v1Parts.push(0)
  while (v2Parts.length < maxLength) v2Parts.push(0)

  // Compare each segment
  for (let i = 0; i < maxLength; i++) {
    if (v1Parts[i] > v2Parts[i]) {
      return operator ? handleOperator(1, operator) : 1
    }
    if (v1Parts[i] < v2Parts[i]) {
      return operator ? handleOperator(-1, operator) : -1
    }
  }

  return operator ? handleOperator(0, operator) : 0
}

function handleOperator(
  compareResult: number,
  operator: ComparisonOperator,
): boolean {
  switch (operator) {
    case '>':
      return compareResult > 0
    case '<':
      return compareResult < 0
    case '=':
    case '==':
      return compareResult === 0
    case '>=':
      return compareResult >= 0
    case '<=':
      return compareResult <= 0
    case '!=':
    case '!==':
      return compareResult !== 0
    default:
      throw new Error(`Unsupported operator: ${operator}`)
  }
}
