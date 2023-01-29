import { _toString } from '../utils/common'

/**
 * 判断是否是Map
 */
export function isMap(o: any): o is Map<any, any> {
  return _toString.call(o) === '[object Map]'
}
