import { _toString } from './common'

export function isPlainObject(o: any): boolean {
  return _toString.call(o) === '[object Object]'
}
