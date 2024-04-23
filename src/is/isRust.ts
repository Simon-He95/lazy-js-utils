import process from 'node:process'
import path from 'node:path'
import { jsShell } from '../node/jsShell'

/**
 * 判断是否是rust环境
 */
export function isRust() {
  const rootPath = process.cwd()
  const url = path.resolve(rootPath, 'Cargo.toml')
  const { result } = jsShell(`test -f "${url}" && echo "0"|| echo "1"`, 'pipe')
  return result === '0'
}
