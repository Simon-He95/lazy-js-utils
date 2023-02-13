/**
 * 浏览器关闭前
 * @param { (ev: Event) => void } callback 回调
 * @returns
 */
export function beforeUnmount(callback: (ev: Event) => void) {
  const fn = window.onbeforeunload || function () {}
  window.onbeforeunload = function (ev: Event) {
    callback?.(ev)
    fn.call(this as any, ev)
  }
  return callback
}
