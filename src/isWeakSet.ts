import { _toString } from './common'
export function isWeakSet(o: any): boolean {
  return _toString.call(o) === '[object WeakSet]'
}
