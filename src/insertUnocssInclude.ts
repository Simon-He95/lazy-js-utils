import fs from 'fs'
import { isStr } from './isStr'
export async function insertUnocssInclude(paths: string[] | string = ['./dist/index.js', './dist/index.mjs']): Promise<void> {
  const reg = '// @unocss-include \n'
  if (isStr(paths))
    paths = [paths as string];
  (paths as string[]).forEach(async (relativepath) => {
    const content = await fs.readFileSync('./dist/index.js', 'utf-8').replace(new RegExp(reg, 'g'), '')
    fs.writeFile(relativepath, `${reg}${content}`, (err) => {
      if (err)
        throw err
    })
  })
}

