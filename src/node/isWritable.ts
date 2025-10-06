import fs from 'node:fs'

/**
 * 同步地测试用户对 path 指定的文件或目录的权限
 * @param { string } filename 文件或目录路径
 * @returns
 * @description EN: Return true if the given file or directory is writable by the current user.
 */
export function isWritable(filename: string): boolean {
  try {
    fs.accessSync(filename, fs.constants.W_OK)
    return true
  }
  catch {
    return false
  }
}
