import { toAbsolutePath } from '../to/toAbsolutePath'
import { isFile } from '../is'
import type { PkgTool } from '../types'
import { getPkg } from './getPkg'

/**
 * 获取当前包管理器 ‘yarn’ | 'pnpm' | 'bun' | 'npm'
 * @returns 返回当前package环境 ‘yarn’ | 'pnpm' | 'bun' | 'npm'
 */
export async function getPkgTool(): Promise<PkgTool> {
  const pkg = (await getPkg()) || {}
  const { packageManager } = pkg
  if (packageManager) {
    const manager: PkgTool = packageManager.split('@')[0].replace(/[\~\^]/, '')
    if (packageManager)
      return manager
  }

  switch (true) {
    case isFile(toAbsolutePath('./bun.lockb')):
      return 'bun'
    case isFile(toAbsolutePath('./pnpm-lock.yaml')):
    case isFile(toAbsolutePath('./pnpm-workspace.yaml')):
      return 'pnpm'
    case isFile(toAbsolutePath('./yarn.lock')):
    case isFile(toAbsolutePath('./lerna.json')):
      return 'yarn'
    default:
      return 'npm'
  }
}
