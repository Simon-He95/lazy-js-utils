import { jsShell } from './jsShell'
import type { IShellMessage } from './types'
export function fileCopy(urls: string[], destination: string): IShellMessage {
  return jsShell(`cp -r {${urls.join(',')}} ${destination}`, 'pipe')
}
