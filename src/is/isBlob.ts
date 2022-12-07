import { _toString } from '../utils/common'
export function isBlob(o: any): o is Blob {
  return _toString.call(o) === '[object Blob]'
}
