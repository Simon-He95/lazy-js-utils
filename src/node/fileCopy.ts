import type { IShellMessage } from '../types'
import { jsShell } from './jsShell'

/**
 * 将文件拷贝到另一个目录
 * @param urls 需要被拷贝的文件路径
 * @param destination 目录
 * @returns
 */
export function fileCopy(urls: string[], destination: string): IShellMessage {
  return jsShell(`cp -r {${urls.join(',')}} ${destination}`, 'pipe')
}
