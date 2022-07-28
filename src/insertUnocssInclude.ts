import { writeFile } from './writeFile'
export function insertUnocssInclude(paths: string[] | string = ['./dist/index.js', './dist/index.mjs']): void {
  const reg = '// @unocss-include \n'
  writeFile(paths, content => reg + content.replace(new RegExp(reg, 'g'), ''))
}
