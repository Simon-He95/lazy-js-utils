import { writeFile } from './writeFile'
export function insertUnocssInclude(paths: string[] | string = ['./dist/index.js', './dist/index.mjs']): void {
  const reg = '// @unocss-include \n'
  const strict = '"use strict";'
  writeFile(paths, (content) => {
    content = content.replace(new RegExp(reg, 'g'), '')
    return content.startsWith(strict)
      ? content.replace(strict, `${strict}\n${reg}`)
      : reg + content
  })
}
