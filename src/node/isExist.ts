import fs from 'node:fs'
import { toAbsolutePath } from '../to/toAbsolutePath'

/**
 * 判断文件是否存在
 * @param url
 * @returns
 * @description EN: Return true if the given path exists on disk, false otherwise.
 */
export function isExist(url: string): boolean {
  try {
    fs.accessSync(toAbsolutePath(url))
    return true
  }
  catch (error) {
    return false
  }
}
