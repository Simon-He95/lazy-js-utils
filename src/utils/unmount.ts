/**
 * 浏览器卸载时
 * @param { (ev: Event) => void } callback 回调
 * @returns
 */
export function unmount(callback: (ev: Event) => void) {
  const fn = window.onunload || function () {}
  window.onunload = function (ev: Event) {
    callback?.(ev)
    fn.call(this as any, ev)
  }
  return callback
}
