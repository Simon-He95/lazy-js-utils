import { statSync } from 'fs'
import { _toString } from './common'
export function isFile(o: Blob | string): boolean {
  if (typeof o === 'string') {
    try {
      return statSync(o).isFile()
    }
    catch (error) {
      return false
    }
  }
  return _toString.call(o) === '[object File]'
}
