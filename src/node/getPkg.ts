import fs from 'fs'
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
export async function getPkg(
  url = './package.json',
): Promise<IPackage & Record<string, any>> {
  const resolvedPath = toAbsolutePath(url)
  if (!isFile(resolvedPath))
    throw new Error(`${resolvedPath} is not a file`)
  return JSON.parse(await fs.promises.readFile(resolvedPath, 'utf-8'))
}
