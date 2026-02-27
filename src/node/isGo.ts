import path from 'node:path'
import process from 'node:process'
import fsp from 'node:fs/promises'

/**
 * 判断是否是在go环境
 * @returns
 * @description EN: Detect whether the current project is a Go project by checking for go files or go.mod.
 */
export async function isGo(rootPath = process.cwd()) {
  const mainFile = path.resolve(rootPath, 'main.go')
  const modFile = path.resolve(rootPath, 'go.mod')

  try {
    if ((await fsp.stat(mainFile)).isFile())
      return true
  }
  catch {}

  try {
    return (await fsp.stat(modFile)).isFile()
  }
  catch {
    return false
  }
}
