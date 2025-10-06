import { _toString } from '../utils/common'

/**
 * 判断是否为 Set
 * @description EN: Check whether a value is a Set instance.
 * @param {any} o Candidate value.
 * @returns {o is Set<any>} True when the internal [[Class]] is 'Set'.
 */
export function isSet(o: any): o is Set<any> {
  return _toString.call(o) === '[object Set]'
}
