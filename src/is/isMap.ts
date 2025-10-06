import { _toString } from '../utils/common'

/**
 * 判断是否是 Map
 * @description EN: Check whether a value is a Map instance.
 * @param {any} o Candidate value.
 * @returns {o is Map<any, any>} True if the internal [[Class]] is 'Map'.
 */
export function isMap(o: any): o is Map<any, any> {
  return _toString.call(o) === '[object Map]'
}
