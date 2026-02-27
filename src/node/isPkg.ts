import process from 'node:process'
import path from 'node:path'
import { hasPkg } from './hasPkg'

/**
 * 判断路径下是否有package.jsons
 * @param { string } rootPath 默认 process.cwd()
 * @description EN: Determine whether a package.json exists in the given path (defaults to process.cwd()).
 */
export async function isPkg(rootPath: string = process.cwd()) {
  const resolvedRoot = path.resolve(rootPath)
  const targetRoot
    = path.basename(resolvedRoot).toLowerCase() === 'package.json'
      ? path.dirname(resolvedRoot)
      : resolvedRoot
  return hasPkg(targetRoot)
}
