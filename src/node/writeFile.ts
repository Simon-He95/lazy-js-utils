import fs from 'fs'
import { isStr } from '../is/isStr'

export function writeFile(paths: string[] | string, callback: (content: string, index: number) => string, encoding: BufferEncoding = 'utf-8') {
  if (isStr(paths))
    paths = [paths as string];
  (paths as string[]).forEach(async (relativepath, i) => {
    const content = await fs.readFileSync(relativepath, encoding)
    const result = callback?.(content, i) || content
    fs.writeFile(relativepath, result, (err) => {
      if (err)
        throw err
    })
  })
}
