import { _toString } from '../utils/common'

/**
 * 判断是否是WeakSet
 */
export function isWeakSet(o: any): o is WeakSet<any> {
  return _toString.call(o) === '[object WeakSet]'
}
