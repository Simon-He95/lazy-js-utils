import process from 'node:process'
import path from 'path'
import fs from 'fs'
import { isAbsolute } from './isAbsolute'
import { isFile } from './isFile'
export async function getPkg(url: string) {
  const resolvedPath = isAbsolute(url) ? url : path.resolve(process.cwd(), url)
  if (!isFile(resolvedPath))
    throw new Error(`${resolvedPath} is not a file`)
  return JSON.parse(await fs.promises.readFile(resolvedPath, 'utf-8'))
}
