import fs from 'fs'
import { getResolvedPath } from './getResolvedPath'
import type { PkgTool } from './types'
export function getPkgTool(): PkgTool {
  try {
    fs.accessSync(getResolvedPath('./yarn.lock'), fs.constants.F_OK)
    return 'yarn'
  }
  catch (error) {
    try {
      fs.accessSync(getResolvedPath('./pnpm-lock.yaml'), fs.constants.F_OK)
      return 'pnpm'
    }
    catch (error) {
      try {
        fs.accessSync(getResolvedPath('./bun.lockb'), fs.constants.F_OK)
        return 'bun'
      }
      catch (error) {
        return 'npm'
      }
    }
  }
}
