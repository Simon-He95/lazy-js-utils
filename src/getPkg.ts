import fs from 'fs'
import { isFile } from './isFile'
import { getResolvedPath } from './getResolvedPath'
export async function getPkg(url = './package.json') {
  const resolvedPath = getResolvedPath(url)
  if (!isFile(resolvedPath))
    throw new Error(`${resolvedPath} is not a file`)
  return JSON.parse(await fs.promises.readFile(resolvedPath, 'utf-8'))
}
