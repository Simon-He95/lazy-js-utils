import { isArray } from '../is/isArray'
import { isPlainObject } from '../is/isPlainObject'

/**
 * 快速操纵session
 * @returns get set delete clear
 */
export function jsSession() {
  // @description EN: Simple wrapper to interact with sessionStorage: set/get/delete/clear.
  return {
    set(key: string | Record<string, string>, value?: string) {
      if (isPlainObject(key))
        Object.keys(key).forEach(k => sessionStorage.setItem(k, key[k]))
      else sessionStorage.setItem(key, value!)
    },
    get(key: string) {
      return sessionStorage.getItem(key)
    },
    delete(key: string | string[]) {
      if (isArray(key))
        key.forEach(k => sessionStorage.removeItem(k))
      else sessionStorage.removeItem(key)
    },
    clear() {
      sessionStorage.clear()
    },
  }
}
