import { _toString } from '../utils/common'

/**
 * Check whether value is a plain object (i.e. {}).
 *
 * @param {any} o Candidate value.
 * @returns {o is Record<any, any>} True when `o` is a plain object.
 */
export function isPlainObject(o: any): o is Record<any, any> {
  return _toString.call(o) === '[object Object]'
}
