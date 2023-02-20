import { toAbsolutePath } from '../to/toAbsolutePath'
import { isFile } from '../is'
import type { PkgTool } from '../types'
/**
 * 获取当前包管理器 ‘yarn’ | 'pnpm' | 'bun' | 'npm'
 * @returns 返回当前package环境 ‘yarn’ | 'pnpm' | 'bun' | 'npm'
 */
export function getPkgTool(): PkgTool {
  switch (true) {
    case isFile(toAbsolutePath('./yarn.lock')):
    case isFile(toAbsolutePath('./lerna.json')):
      return 'yarn'
    case isFile(toAbsolutePath('./pnpm-lock.yaml')):
    case isFile(toAbsolutePath('./pnpm-workspace.yaml')):
      return 'pnpm'
    case isFile(toAbsolutePath('./bun.lockb')):
      return 'bun'
    default:
      return 'npm'
  }
}
