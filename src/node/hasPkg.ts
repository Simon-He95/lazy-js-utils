import path from 'node:path'
import { jsShell } from './jsShell'

/**
 * 判断是否存在package.json
 * @param { string } rootPath 绝对路径
 * @returns boolean
 */
export async function hasPkg(rootPath: string) {
  const url = path.resolve(rootPath, 'package.json')
  const { result } = await jsShell(
    `test -f "${url}" && echo "0"|| echo "1"`,
    'pipe',
  )
  return result === '0'
}
