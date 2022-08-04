import { _toString } from './common'
export function isBlob(o: any): o is Blob {
  return _toString.call(o) === '[object Blob]'
}
