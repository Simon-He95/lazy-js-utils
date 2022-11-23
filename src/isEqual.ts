import { isArray } from './isArray'
import { isPlainObject } from './isPlainObject'

export function isEqual(o1: any, o2: any): boolean {
  if (o1 === o2)
    return true

  if (isPlainObject(o1) && isPlainObject(o2)) {
    const keys1 = Object.keys(o1)
    const keys2 = Object.keys(o2)
    if (keys1.length !== keys2.length)
      return false

    for (const key of keys1) {
      const res = isEqual(o1[key], o2[key])
      if (!res)
        return false
    }
    return true
  }
  else if (isArray(o1) && isArray(o2)) {
    if (o1.length !== o2.length)
      return false

    for (let i = 0; i < o1.length; i++) {
      const res = isEqual(o1[i], o2[i])
      if (!res)
        return false
    }
    return true
  }
  return false
}

