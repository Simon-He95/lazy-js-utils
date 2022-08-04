import { _toString } from './common'
export function isSet(o: any): o is Set<any> {
  return _toString.call(o) === '[object Set]'
}
