export function fullScreen() {
  const el: any = document.documentElement
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  if (rfs)
    rfs.call(el)
  else
    return new Error('浏览器不支持全屏')
}
