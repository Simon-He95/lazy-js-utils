import fs from 'fs'
import { _toString } from '../utils/common'
import { isStr } from './isStr'
export function isFile(o: Blob | string): o is File {
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
