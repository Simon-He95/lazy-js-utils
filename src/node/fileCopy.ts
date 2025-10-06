import { jsShell } from './jsShell'

/**
 * 将文件拷贝到另一个目录
 * @param urls 需要被拷贝的文件路径
 * @param destination 目录
 * @returns IShellMessage
 * @description EN: Copy given files to a destination directory via a shell command wrapper.
 */
export function fileCopy(urls: string[], destination: string) {
  return jsShell(`cp -r {${urls.join(',')}} ${destination}`, 'pipe')
}
