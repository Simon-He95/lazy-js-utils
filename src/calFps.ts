import { animationFrameWrapper } from './animationFrameWrapper'

export function calFps() {
  let lastTime: number
  let frame = 0
  return animationFrameWrapper((timestamp) => {
    frame++
    if (!lastTime)
      lastTime = timestamp
    if (timestamp - lastTime > 1000) {
      console.log('FPS:', Math.round(frame * 1000) / (timestamp - lastTime))
      frame = 0
      lastTime = timestamp
    }
  }, 0)
}
