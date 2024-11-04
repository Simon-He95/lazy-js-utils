import { useRaf } from '../perf'

export function calFps() {
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
