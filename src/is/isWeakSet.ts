import { _toString } from '../utils/common'

/**
 * 判断是否为 WeakSet
 * @description EN: Check whether a value is a WeakSet instance.
 * @param {any} o Candidate value.
 * @returns {o is WeakSet<any>}
 */
export function isWeakSet(o: any): o is WeakSet<any> {
  return _toString.call(o) === '[object WeakSet]'
}
