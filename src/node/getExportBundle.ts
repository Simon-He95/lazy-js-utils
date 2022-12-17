import fsp from 'fs/promises'
import path from 'path'
import process from 'process'
export async function getExportBundle(url: string) {
  if (/[./]/.test(url))
    throw new Error('module must be a npm module')
  const pkg = path.resolve(process.cwd(), 'node_modules', url, 'package.json')
  const { module, main } = JSON.parse(await fsp.readFile(pkg, 'utf-8'))
  const modulePath = path.resolve('./node_modules/vitest', module || main)
  return fsp.readFile(modulePath, 'utf-8')
}
