import { _toString } from './common'
export function isMap(o: any): o is Map<any, any> {
  return _toString.call(o) === '[object Map]'
}
