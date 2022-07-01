export function animationFrameWrapper(fn: () => void, delta = 1000): (() => void) {
  let start: number; let work = true
  const animationFrame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.msRequestAnimationFrame
    || (fn => setTimeout(fn, 1000 / 60))
  const cancelAnimation = window.cancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.oCancelAnimationFrame
    || window.msCancelAnimationFrame
    || clearTimeout
  const animationId = animationFrame(function myFrame(timestamp: number = Date.now()) {
    if (!work)
      return
    if (start === undefined) { start = timestamp }
    else if (timestamp - start > delta) {
      fn?.()
      start = timestamp
    }
    animationFrame(myFrame)
  })
  return () => {
    work = false
    cancelAnimation(animationId)
  }
}
