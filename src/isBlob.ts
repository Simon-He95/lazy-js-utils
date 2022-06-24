import { _toString } from './common'
export function isBlob(o: any): boolean {
  return _toString.call(o) === '[object Blob]'
}
