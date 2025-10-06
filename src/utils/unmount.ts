/**
 * 浏览器卸载时
 * @description EN: Register a callback to run when the window unloads.
 * @param { (ev: Event) => void } callback 回调
 * @returns { (ev: Event) => void }
 */
export function unmount(callback: (ev: Event) => void) {
  const fn = window.onunload || function () {}
  window.onunload = function (ev: Event) {
    callback?.(ev)
    fn.call(this as any, ev)
  }
  return callback
}
