import { isUndef } from '../is/isUndef'

/**
 * 浏览器在下次重绘之前调用指定的回调函数更新动画
 * @param { Function } fn 函数
 * @param { number } delta 间隔时间
 * @param { boolean } autoStop 自动销毁
 * @returns
 */
export function useAnimationFrame(
  fn: (timestamp: number) => void,
  delta = 0,
  autoStop = false,
): () => void {
  let start: number
  let work = true
  const animationFrame
    = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || (fn => setTimeout(fn, 1000 / 60))
  const cancelAnimation
    = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.oCancelAnimationFrame
    || window.msCancelAnimationFrame
    || clearTimeout
  const animationId = animationFrame(function myFrame(
    timestamp: number = Date.now(),
  ) {
    if (!work)
      return
    if (isUndef(start)) {
      start = timestamp
    }
    else if (timestamp - start > delta) {
      fn?.(timestamp)
      start = timestamp
      if (autoStop)
        stop()
    }
    animationFrame(myFrame)
  })
  function stop() {
    work = false
    cancelAnimation(animationId)
  }
  return stop
}
