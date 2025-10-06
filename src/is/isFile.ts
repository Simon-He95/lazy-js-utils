import fs from 'node:fs'
import { _toString } from '../utils/common'
import { isStr } from './isStr'

/**
 * 判断是否是文件
 * @description EN: Check whether the input is a File (or file path on Node.js).
 * @param o - Blob, File or string path
 * @returns boolean
 */
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
