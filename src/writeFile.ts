import fs from 'fs'
import { isStr } from './isStr'

export function writeFile(paths: string[] | string, callback: (content: string, index: number) => string) {
  if (!callback)
    throw new Error('callback is required')
  if (isStr(paths))
    paths = [paths as string];
  (paths as string[]).forEach(async (relativepath, i) => {
    const result = callback(await fs.readFileSync(relativepath, 'utf-8'), i)
    if (!result)
      throw new Error('callback needs to return string content')
    fs.writeFile(relativepath, result, (err) => {
      if (err)
        throw err
    })
  })
}
