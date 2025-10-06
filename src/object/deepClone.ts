import { isFn } from '../is/isFn'
import { isNull } from '../is/isNull'
import { isObject } from '../is/isObject'

const types = [Set, Map, WeakMap, WeakSet, RegExp, Date]

/**
 * Deep clone a value.
 *
 * Performs a deep clone for plain objects and arrays. Built-in collection
 * types (Set, Map, WeakMap, WeakSet, RegExp, Date) are cloned via their
 * constructors. Functions and `null` are returned as-is. A per-call WeakMap
 * is used to handle circular references and to preserve object identity
 * within the cloned structure.
 *
 * @param {any} target Value to deep clone.
 * @returns {any} Deep-cloned value.
 */
export function deepClone(target: any) {
  const targetMap = new WeakMap<any, any>()

  function _clone(t: any): any {
    if (targetMap.has(t))
      return targetMap.get(t)
    if (isFn(t) || isNull(t))
      return t
    if (types.includes(t?.constructor))
      return new t.constructor(t)
    if (!isObject(t))
      return t

    const cloneObj = Object.create(
      Object.getPrototypeOf(t),
      Object.getOwnPropertyDescriptors(t),
    )

    targetMap.set(t, cloneObj)

    for (const key of Reflect.ownKeys(t)) {
      const val = (t as any)[key]
      cloneObj[key] = isObject(val) ? _clone(val) : val
    }

    return cloneObj
  }

  return _clone(target)
}
