import { _toString } from '../utils/common'
export function isWeakSet(o: any): o is WeakSet<any> {
  return _toString.call(o) === '[object WeakSet]'
}
