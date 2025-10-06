import { _toString } from '../utils/common'

/**
 * 判断是否是blob
 * @description EN: Check whether a value is a Blob object.
 * @param o - candidate value
 * @returns boolean
 */
export function isBlob(o: any): o is Blob {
  return _toString.call(o) === '[object Blob]'
}
