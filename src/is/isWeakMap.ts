import { _toString } from '../utils/common'

/**
 * 判断是否是WeakMap
 */
export function isWeakMap(o: any): o is WeakMap<any, any> {
  return _toString.call(o) === '[object WeakMap]'
}
