import process from 'node:process'

/**
 * 判断是windows电脑
 */
export function isWin(): boolean {
  return process.platform === 'win32'
}
