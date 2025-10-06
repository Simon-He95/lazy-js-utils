import process from 'node:process'

/**
 * 判断是否为 Windows 平台
 * @description EN: Returns true when running on Windows (platform 'win32').
 * @returns {boolean}
 */
export function isWin(): boolean {
  return process.platform === 'win32'
}
