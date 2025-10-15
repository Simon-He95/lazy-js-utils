import { bounceOut } from './bounceOut'

/**
 * 弹跳进入缓动曲线
 * @description EN: Bounce-in easing that simulates a bouncing object accelerating toward the start.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function bounceIn(t: number) {
  return 1.0 - bounceOut(1.0 - t)
}
