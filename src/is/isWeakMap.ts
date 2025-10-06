import { _toString } from '../utils/common'

/**
 * 判断是否为 WeakMap
 * @description EN: Check whether a value is a WeakMap instance.
 * @param {any} o Candidate value.
 * @returns {o is WeakMap<any, any>}
 */
export function isWeakMap(o: any): o is WeakMap<any, any> {
  return _toString.call(o) === '[object WeakMap]'
}
