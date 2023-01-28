import process from 'process'
import path from 'path'
import { isAbsolute } from '../is/isAbsolute'

/**
 *
 * @param { string } url 路径
 * @returns 绝对路径
 */
export function toAbsolutePath(url: string): string {
  return isAbsolute(url) ? url : path.resolve(process.cwd(), url)
}
