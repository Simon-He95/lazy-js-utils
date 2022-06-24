import { _toString } from './common'
export function isFile(o: any): boolean {
  return _toString.call(o) === '[object File]'
}
