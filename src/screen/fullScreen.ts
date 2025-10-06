/**
 * 全屏模式
 * @returns
 * @description EN: Request the browser to enter fullscreen using common vendor-prefixed APIs; returns an Error if not supported.
 */
export function fullScreen() {
  try {
    const el: any = document.documentElement
    const rfs
      = el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullScreen
    if (rfs)
      rfs.call(el)
    else return new Error('浏览器不支持全屏')
  }
  catch (error: any) {
    throw new Error(error)
  }
}
