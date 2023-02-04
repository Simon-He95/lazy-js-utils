/**
 * 浏览器卸载时
 * @param callback 回调
 * @returns
 */
export function unmount(callback: () => void) {
  window.onunload = callback
  return callback
}
