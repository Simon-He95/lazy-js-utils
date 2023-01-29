import { _toString } from '../utils/common'

/**
 * 判断是否是Set
 */
export function isSet(o: any): o is Set<any> {
  return _toString.call(o) === '[object Set]'
}
