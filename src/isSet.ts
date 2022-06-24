import { _toString } from './common'
export function isSet(o: any): boolean {
  return _toString.call(o) === '[object Set]'
}
