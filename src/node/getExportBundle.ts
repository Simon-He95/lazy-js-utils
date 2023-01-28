import fsp from 'fs/promises'
import path from 'path'
import process from 'process'

/**
 * 获取npm包导出的文件内容
 * @param { string } url npm包名
 * @returns
 */
export async function getExportBundle(url: string) {
  if (/[./]/.test(url))
    throw new Error('module must be a npm module')
  const pkg = path.resolve(process.cwd(), 'node_modules', url, 'package.json')
  const { module, main } = JSON.parse(await fsp.readFile(pkg, 'utf-8'))
  const modulePath = path.resolve(`./node_modules/${url}`, module || main)
  return fsp.readFile(modulePath, 'utf-8')
}

// console.log(await getExportBundle('lazy-js-utils'))
