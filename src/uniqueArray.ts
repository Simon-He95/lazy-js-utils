import { isType } from './isType'

export function uniqueArray(array: any[]): any[] {
  return array.reduce((result, item) => {
    if (isType(item, 'o|a')) {
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
    if (isType(a[key], 'o|a') && isType(b[key], 'o|a')) {
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
  return result.some(i => isType(i, 'o|a') && equals(item, i))
}
