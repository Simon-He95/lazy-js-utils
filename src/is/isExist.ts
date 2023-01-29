import fs from 'fs'
import { toAbsolutePath } from '../to/toAbsolutePath'
/**
 * 判断文件是否存在
 * @param url
 * @returns
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
