import type { IShellMessage } from '../types'
import { jsShell } from './jsShell'
export function fileCopy(urls: string[], destination: string): IShellMessage {
  return jsShell(`cp -r {${urls.join(',')}} ${destination}`, 'pipe')
}
