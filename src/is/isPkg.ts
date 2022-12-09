import path from 'path'
import { jsShell } from '../node/jsShell'

export function isPkg(rootPath: string = process.cwd()) {
  const url = path.resolve(
    rootPath.replace(/package.json$/, ''),
    'package.json',
  )
  const { result } = jsShell(`test -f "${url}" && echo "0"|| echo "1"`, 'pipe')
  return result === '0'
}
