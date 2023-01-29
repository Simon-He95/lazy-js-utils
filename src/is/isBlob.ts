import { _toString } from '../utils/common'
/**
 * 判断是否是blob
 * @param o
 * @returns
 */
export function isBlob(o: any): o is Blob {
  return _toString.call(o) === '[object Blob]'
}
