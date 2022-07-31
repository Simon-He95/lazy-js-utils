import fs from 'fs'
import { isStr } from './isStr'

export function writeFile(paths: string[] | string, callback: (content: string, index: number) => string) {
  if (isStr(paths))
    paths = [paths as string];
  (paths as string[]).forEach(async (relativepath, i) => {
    const content = await fs.readFileSync(relativepath, 'utf-8')
    const result = callback?.(content, i) || content
    fs.writeFile(relativepath, result, (err) => {
      if (err)
        throw err
    })
  })
}
