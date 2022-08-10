import fs from 'fs'
import { getResolvedPath } from './getResolvedPath'
export function isExist(url: string): boolean {
  try {
    fs.accessSync(getResolvedPath(url))
    return true
  }
  catch (error) {
    return false
  }
}
