import { cwd } from 'node:process'
import { resolve } from 'path'
import { promises as fsp } from 'fs'
import { isAbsolute } from './isAbsolute'
import { isFile } from './isFile'
export async function getPkg(url: string) {
  const resolvedPath = isAbsolute(url) ? url : resolve(cwd(), url)
  if (!isFile(resolvedPath))
    throw new Error(`${resolvedPath} is not a file`)

  const blob = await fsp.readFile(resolvedPath, 'utf-8')
  return JSON.parse(blob)
}
