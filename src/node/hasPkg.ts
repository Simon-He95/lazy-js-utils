import path from 'path'
import { jsShell } from './jsShell'
/**
 *
 * @param { string } rootPath 绝对路径
 * @returns 是否存在package.json
 */
export function hasPkg(rootPath: string) {
  const url = path.resolve(rootPath, 'package.json')
  const { result } = jsShell(`test -f "${url}" && echo "0"|| echo "1"`, 'pipe')
  return result === '0'
}
