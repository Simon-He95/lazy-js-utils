import fs from 'fs'
import path from 'path'
import process from 'process'
export function getExportBundle(url: string) {
  if (/[./]/.test(url))
    throw new Error('module must be a npm module')
  const pkg = path.resolve(process.cwd(), 'node_modules', url, 'package.json')
  const { module, main } = JSON.parse(fs.readFileSync(pkg, 'utf-8'))
  const modulePath = path.resolve('./node_modules/vitest', module || main)
  return fs.readFileSync(modulePath, 'utf-8')
}
