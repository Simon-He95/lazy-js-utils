import fsp from 'fs/promises'
import { isStr } from '../is/isStr'

export function writeFile(
  paths: string[] | string,
  callback: (content: string, index: number) => string,
  encoding: BufferEncoding = 'utf-8',
) {
  if (isStr(paths))
    paths = [paths as string]
  ;(paths as string[]).forEach(async (relativepath, i) => {
    const content = await fsp.readFile(relativepath, encoding)
    const result = callback?.(content, i) || content
    fsp.writeFile(relativepath, result).catch((err: any) => {
      throw err
    })
  })
}
