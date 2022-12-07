import fs from 'fs'
import { toAbsolutePath } from '../to/toAbsolutePath'
export function isExist(url: string): boolean {
  try {
    fs.accessSync(toAbsolutePath(url))
    return true
  }
  catch (error) {
    return false
  }
}
