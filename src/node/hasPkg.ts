import path from 'node:path'
import fsp from 'node:fs/promises'

/**
 * 判断是否存在package.json
 * @param { string } rootPath 绝对路径
 * @returns boolean
 * @description EN: Check whether a package.json exists at the given root path.
 */
export async function hasPkg(rootPath: string) {
  const url = path.resolve(rootPath, 'package.json')
  try {
    return (await fsp.stat(url)).isFile()
  }
  catch {
    return false
  }
}
