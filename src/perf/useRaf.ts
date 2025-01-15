import { isUndef } from '../is/isUndef'

/**
 * 使用 requestAnimationFrame 执行一个函数，并提供停止执行的功能。
 *
 * @param {function(number): void} fn - 在每一帧调用的函数，参数是时间戳。
 * @param {object} [options] - 配置选项。
 * @param {number} [options.delta] - 两次调用之间的最小时间间隔（毫秒）。
 * @param {boolean} [options.autoStop] - 是否在首次调用后自动停止。
 * @param {boolean} [options.immediate] - 是否在首次调用时立即执行。
 * @returns {function(): void} - 停止执行的函数。
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
