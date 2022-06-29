export function animationFrameWrapper(fn: () => void, delta: number): (() => void) {
  let start: number
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
    if (start === undefined) { start = timestamp }
    else {
      if (timestamp - start > delta) {
        fn()
        start = timestamp
      }
    }
    animationFrame(myFrame)
  })
  return () => cancelAnimation(animationId)
}
