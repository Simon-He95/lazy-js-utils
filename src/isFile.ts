import { _toString } from "./common"
export function isFile(o: any) {
  return _toString.call(o) === '[object File]'
}
