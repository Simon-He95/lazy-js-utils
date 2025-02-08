import process from 'node:process'
import path from 'node:path'
import { jsShell } from './jsShell'

/**
 * 判断路径下是否有package.jsons
 * @param { string } rootPath 默认 process.cwd()
 */
export async function isPkg(rootPath: string = process.cwd()) {
  const url = path.resolve(
    rootPath.replace(/package.json$/, ''),
    'package.json',
  )
  const { result } = await jsShell(
    `test -f "${url}" && echo "0"|| echo "1"`,
    'pipe',
  )
  return result === '0'
}
