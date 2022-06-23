import { _toString } from './common'
export function isSet(o: any) {
  return _toString.call(o) === '[object Set]'
}
