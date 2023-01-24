import fsp from 'fs/promises'
import { isFile } from '../is/isFile'
import { toAbsolutePath } from '../to/toAbsolutePath'
interface IPackage {
  name: string
  version: string
  description?: string
  main?: string
  module?: string
  types?: string
  files?: string[]
  scripts?: Record<string, string>
}
/**
 *
 * @param { string } url 路径 默认 ./package.json
 * @returns 返回json格式package.json
 */
export async function getPkg(
  url = './package.json',
): Promise<IPackage & Record<string, any>> {
  const resolvedPath = toAbsolutePath(url)
  if (!isFile(resolvedPath))
    throw new Error(`${resolvedPath} is not a file`)
  return JSON.parse(await fsp.readFile(resolvedPath, 'utf-8'))
}
