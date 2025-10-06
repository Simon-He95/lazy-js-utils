import { _toString } from '../utils/common'

/**
 * 判断是否是promise
 */
/**
 * 判断是否为 Promise
 * @description EN: Check whether a value is a Promise instance.
 * @param {any} o Candidate value.
 * @returns {o is Promise<any>}
 */
export function isPromise(o: any): o is Promise<any> {
  return _toString.call(o) === '[object Promise]'
}
