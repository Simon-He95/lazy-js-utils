import { _toString } from "./common"
export function isBlob(o: any) {
  return _toString.call(o) === '[object Blob]'
}
