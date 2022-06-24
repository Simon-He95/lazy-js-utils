import { isPlainObject } from './isPlainObject'
import { isArray } from './isArray'

function isObjectOrArray(o: any) {
  return isPlainObject(o) || isArray(o)
}

export function uniqueArray(array: any[]): any[] {
  return array.reduce((result, item) => {
    if (isObjectOrArray(item)) {
      if (!isHave(result, item))
        result.push(item)
    }
    else {
      if (!result.includes(item))
        result.push(item)
    }
    return result
  }, [])
}

function equals(a: Record<any, any>, b: Record<any, any>): boolean {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false
  for (const key in a) {
    if (isObjectOrArray(a[key]) && isObjectOrArray(b[key])) {
      if (!equals(a[key], b[key]))
        return false
    }
    else {
      if (a[key] !== b[key])
        return false
    }
  }
  return true
}

function isHave(result: any[], item: any) {
  return result.some(i => isObjectOrArray(i) && equals(item, i))
}
