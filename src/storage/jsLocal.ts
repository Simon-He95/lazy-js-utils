import { isArray } from '../is/isArray'
import { isPlainObject } from '../is/isPlainObject'

/**
 * 快速操纵localstorage
 * @returns get set delete clear
 */
export function jsLocal() {
  // @description EN: Simple wrapper to interact with localStorage: set/get/delete/clear.
  return {
    set(key: string | Record<string, string>, value?: string) {
      if (isPlainObject(key))
        Object.keys(key).forEach(k => localStorage.setItem(k, key[k]))
      else localStorage.setItem(key, value!)
    },
    get(key: string) {
      return localStorage.getItem(key)
    },
    delete(key: string | string[]) {
      if (isArray(key))
        key.forEach(k => localStorage.removeItem(k))
      else localStorage.removeItem(key)
    },
    clear() {
      localStorage.clear()
    },
  }
}
