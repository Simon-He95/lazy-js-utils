import process from 'node:process'
import path from 'node:path'
import { isAbsolute } from '../is/isAbsolute'

/**
 * 将相对路径转换为基于当前工作目录的绝对路径
 * @param {string} url 要转换的路径
 * @returns {string} 绝对路径
 * @description EN: Convert a relative filesystem path to an absolute path using process.cwd(); returns the original path if already absolute.
 */
export function toAbsolutePath(url: string): string {
  return isAbsolute(url) ? url : path.resolve(process.cwd(), url)
}
