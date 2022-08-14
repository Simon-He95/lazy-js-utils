import { isArray } from './isArray'
import { isPlainObject } from './isPlainObject'

export function jsLocal() {
  return {
    set(key: string | Record<string, string>, value?: string) {
      if (isPlainObject(key))
        Object.keys(key).forEach(k => localStorage.setItem(k, key[k]))
      else
        localStorage.setItem(key, value!)
    },
    get(key: string) {
      return localStorage.getItem(key)
    },
    delete(key: string | string[]) {
      if (isArray(key))
        key.forEach(k => localStorage.removeItem(k))
      else
        localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    },
  }
}
