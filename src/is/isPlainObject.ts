import { _toString } from '../utils/common'

/**
 * 判断是否是{}类型
 */
export function isPlainObject(o: any): o is Record<any, any> {
  return _toString.call(o) === '[object Object]'
}
