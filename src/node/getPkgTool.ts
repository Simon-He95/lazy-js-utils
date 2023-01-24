import { toAbsolutePath } from '../to/toAbsolutePath'
import { isFile } from '../is'
import type { PkgTool } from '../types'
/**
 *
 * @returns 返回当前package环境 ‘yarn’ | 'pnpm' | 'bun' | 'npm'
 */
export function getPkgTool(): PkgTool {
  switch (true) {
    case isFile(toAbsolutePath('./yarn.lock')):
      return 'yarn'
    case isFile(toAbsolutePath('./pnpm-lock.yaml')):
      return 'pnpm'
    case isFile(toAbsolutePath('./bun.lockb')):
      return 'bun'
    default:
      return 'npm'
  }
}
