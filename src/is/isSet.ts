import { _toString } from '../utils/common'
export function isSet(o: any): o is Set<any> {
  return _toString.call(o) === '[object Set]'
}
