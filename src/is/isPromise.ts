import { _toString } from '../utils/common'

/**
 * 判断是否是promise
 */
export function isPromise(o: any): o is Promise<any> {
  return _toString.call(o) === '[object Promise]'
}
