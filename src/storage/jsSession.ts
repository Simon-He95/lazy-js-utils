import { isArray } from '../is/isArray'
import { isPlainObject } from '../is/isPlainObject'

export function jsSession() {
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
