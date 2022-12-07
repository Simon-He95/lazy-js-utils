import process from 'process'
import path from 'path'
import { isAbsolute } from '../is/isAbsolute'
export function toAbsolutePath(url: string): string {
  return isAbsolute(url) ? url : path.resolve(process.cwd(), url)
}
