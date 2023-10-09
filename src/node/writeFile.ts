import fsp from 'node:fs/promises'
import { isStr } from '../is/isStr'

/**
 * 重写文件
 * @param { string } paths 路径
 * @param { (content: string, index: number) => string } callback 回调接收文件字符串将返回的内容重新写入该文件
 * @param { string } [encoding] 默认 'utf-8'
 */
export function writeFile(
  paths: string[] | string,
  callback: (content: string, index: number) => string,
  encoding: BufferEncoding = 'utf-8',
) {
  if (isStr(paths)) paths = [paths as string]
  ;(paths as string[]).forEach(async (relativepath, i) => {
    const content = await fsp.readFile(relativepath, encoding)
    const result = callback?.(content, i) || content
    fsp.writeFile(relativepath, result).catch((err: any) => {
      throw err
    })
  })
}
