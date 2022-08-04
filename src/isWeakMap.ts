import { _toString } from './common'
export function isWeakMap(o: any): o is WeakMap<any, any> {
  return _toString.call(o) === '[object WeakMap]'
}
