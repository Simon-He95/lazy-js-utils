import path from 'path'
import { jsShell } from '../node/jsShell'
/**
 * 判断是否是在go环境
 * @returns
 */
export function isGo() {
  const rootPath = process.cwd()
  const url = path.resolve(rootPath, 'go.mod')
  const { result } = jsShell(
    `(test -f "main.go" || test -f "${url}") && echo "0"|| echo "1"`,
    'pipe',
  )
  return result === '0'
}
