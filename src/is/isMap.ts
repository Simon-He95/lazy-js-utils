import { _toString } from '../utils/common'
export function isMap(o: any): o is Map<any, any> {
  return _toString.call(o) === '[object Map]'
}
