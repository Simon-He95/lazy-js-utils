import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

/**
 * 获取npm包导出的文件内容
 * @param { string } url npm包名
 * @returns
 * @description EN: Read the exported module file content for an installed npm package by resolving its package.json `module` or `main` field.
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
