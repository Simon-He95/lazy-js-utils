import { useRaf } from '../perf'

/**
 * 计算并输出当前帧率
 * @description EN: Track frames with `requestAnimationFrame` and log the averaged FPS once per second.
 * @returns { () => void } 取消帧率监听的停止函数
 */
export function calFps(): () => void {
  let lastTime: number
  let frame = 0
  return useRaf((timestamp) => {
    frame++
    if (!lastTime)
      lastTime = timestamp
    if (timestamp - lastTime > 1000) {
      console.log('FPS:', Math.round(frame * 1000) / (timestamp - lastTime))
      frame = 0
      lastTime = timestamp
    }
  })
}
