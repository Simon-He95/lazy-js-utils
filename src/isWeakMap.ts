import { _toString } from './common'
export function isWeakMap(o: any): boolean {
  return _toString.call(o) === '[object WeakMap]'
}
