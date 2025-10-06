import { isUndef } from '../is/isUndef'

/**
 * 使用 requestAnimationFrame 执行一个函数，并提供停止执行的功能。
 * @description EN: Run a callback using requestAnimationFrame with optional throttling (via `delta`) and an option to auto-stop after one invocation.
 *
 * @param {function(number): void} fn - Callback invoked each animation frame with the timestamp.
 * @param {object} [options] - Configuration.
 * @param {number} [options.delta] - Minimum time (ms) between invocations.
 * @param {boolean} [options.autoStop] - If true, stop after the first invocation.
 * @param {boolean} [options.immediate] - If true, invoke immediately on first frame.
 * @returns {function(): void} Stop function that cancels the scheduled frames.
 */
export function useRaf(
  fn: (timestamp: number) => void,
  options: {
    delta?: number
    autoStop?: boolean
    immediate?: boolean
  } = {},
): () => void {
  let start: number
  let isStopped = false
  let rafId: number
  const { immediate, delta = 0, autoStop } = options
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
  const stop = () => {
    isStopped = true
    cancelAnimation(rafId)
  }
  rafId = animationFrame(function myFrame(timestamp: number = Date.now()) {
    if (isUndef(start)) {
      start = timestamp
      if (immediate) {
        // 首次立即执行
        fn?.(timestamp)
      }
    }
    else if (isStopped) {
      return
    }
    else if (timestamp - start > delta) {
      fn?.(timestamp)
      start = timestamp
      if (autoStop) {
        stop()
        return
      }
    }
    rafId = animationFrame(myFrame)
  })

  return stop
}
