import process from 'process'
import path from 'path'
import { isAbsolute } from './isAbsolute'
export function getResolvedPath(url: string): string {
  return isAbsolute(url) ? url : path.resolve(process.cwd(), url)
}
