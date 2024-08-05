import { isType } from '../is/isType'

/**
 *
 * @param { any[] } array 数组
 * @returns 去重后的数组
 */
export function uniqueArray(array: any[]): any[] {
  return array.reduce((result, item) => {
    if (
      (isType(item, 'o|a') && !isHave(result, item))
      || !result.includes(item)
    ) {
      result.push(item)
    }
    return result
  }, [])
}

function equals(a: Record<any, any>, b: Record<any, any>): boolean {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false
  for (const key in a) {
    if (
      (isType(a[key], 'o|a')
      && isType(b[key], 'o|a')
      && !equals(a[key], b[key]))
      || a[key] !== b[key]
    ) {
      return false
    }
  }
  return true
}

function isHave(result: any[], item: any): boolean {
  return result.some(i => isType(i, 'o|a') && equals(item, i))
}
