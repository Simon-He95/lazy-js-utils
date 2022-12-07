import fs from 'fs'
import { toAbsolutePath } from '../to/toAbsolutePath'
import type { PkgTool } from '../types'
export function getPkgTool(): PkgTool {
  try {
    fs.accessSync(toAbsolutePath('./yarn.lock'), fs.constants.F_OK)
    return 'yarn'
  }
  catch (error) {
    try {
      fs.accessSync(toAbsolutePath('./pnpm-lock.yaml'), fs.constants.F_OK)
      return 'pnpm'
    }
    catch (error) {
      try {
        fs.accessSync(toAbsolutePath('./bun.lockb'), fs.constants.F_OK)
        return 'bun'
      }
      catch (error) {
        return 'npm'
      }
    }
  }
}
