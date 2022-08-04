import { _toString } from './common'

export function isPlainObject(o: any): o is object {
  return _toString.call(o) === '[object Object]'
}
