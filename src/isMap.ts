import { _toString } from './common'
export function isMap(o: any): boolean {
  return _toString.call(o) === '[object Map]'
}
