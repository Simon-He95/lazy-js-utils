import { isType } from '../is/isType'

/**
 * 数组去重函数
 * @param { any[] } array 数组
 * @param { string[] } keys 可选，指定比较的键路径数组，如 ['name', 'target.age']。如果指定了keys，则只要这些指定的键值都相同，就认为是同一项进行去重
 * @returns 去重后的数组
 * @example
 * // 基本去重
 * uniqueArray([1, 2, 2, 3]) // [1, 2, 3]
 *
 * // 按指定键去重
 * uniqueArray([
 *   { name: 'Tom', age: 20 },
 *   { name: 'Tom', age: 25 },
 *   { name: 'Jerry', age: 20 }
 * ], ['name']) // [{ name: 'Tom', age: 20 }, { name: 'Jerry', age: 20 }]
 *
 * // 按多个键去重
 * uniqueArray([...], ['name', 'age']) // 只有name和age都相同才认为是重复项
 *
 * // 按嵌套键去重
 * uniqueArray([...], ['target.age']) // 支持深层嵌套访问
 */
export function uniqueArray(array: any[], keys?: string[]): any[] {
  return array.reduce((result, item) => {
    if (keys && keys.length > 0) {
      // 使用指定键进行比较
      if (!isHaveByKeys(result, item, keys)) {
        result.push(item)
      }
    }
    else {
      // 原有逻辑
      if (
        (isType(item, 'o|a') && !isHave(result, item))
        || !result.includes(item)
      ) {
        result.push(item)
      }
    }
    return result
  }, [])
}

function equals(a: any, b: any): boolean {
  if (a === b)
    return true

  if (a == null || b == null)
    return a === b

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length)
      return false
    for (let i = 0; i < a.length; i++) {
      if (!equals(a[i], b[i]))
        return false
    }
    return true
  }

  if (isType(a, 'o') && isType(b, 'o')) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length)
      return false
    for (const key of keysA) {
      if (!keysB.includes(key) || !equals(a[key], b[key])) {
        return false
      }
    }
    return true
  }

  return false
}

function isHave(result: any[], item: any): boolean {
  return result.some(i => isType(i, 'o|a') && equals(item, i))
}

function getValueByPath(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

function isHaveByKeys(result: any[], item: any, keys: string[]): boolean {
  return result.some((resultItem) => {
    return keys.every((key) => {
      const itemValue = getValueByPath(item, key)
      const resultItemValue = getValueByPath(resultItem, key)

      if (isType(itemValue, 'o|a') && isType(resultItemValue, 'o|a')) {
        return equals(itemValue, resultItemValue)
      }
      return itemValue === resultItemValue
    })
  })
}
