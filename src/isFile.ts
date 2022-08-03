import fs from 'fs'
import { _toString } from './common'
import { isStr } from './isStr'
export function isFile(o: Blob | string): boolean {
  if (isStr(o)) {
    try {
      return fs.statSync(o as string).isFile()
    }
    catch (error) {
      return false
    }
  }
  return _toString.call(o) === '[object File]'
}
