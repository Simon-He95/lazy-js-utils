import type { ComparisonOperator } from '../types'

/**
 * 比较两个版本号
 * @param {string} version1 - 第一个版本号
 * @param {string} version2 - 第二个版本号
 * @param {ComparisonOperator} [operator] - 比较操作符: '>', '<', '=', '>=', '<=', '!='
 * @returns {number|boolean} 如果提供操作符则返回布尔值，否则返回数字(-1, 0, 1)
 */
function compareVersion(version1: string, version2: string): number
function compareVersion(
  version1: string,
  version2: string,
  operator: ComparisonOperator,
): boolean
function compareVersion(
  version1: string,
  version2: string,
  operator?: ComparisonOperator,
): number | boolean {
  const v1Parts = version1.split('.').map(Number)
  const v2Parts = version2.split('.').map(Number)

  const maxLength = Math.max(v1Parts.length, v2Parts.length)

  // 补齐较短的版本号
  while (v1Parts.length < maxLength) v1Parts.push(0)
  while (v2Parts.length < maxLength) v2Parts.push(0)

  // 逐位比较
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

export default compareVersion
