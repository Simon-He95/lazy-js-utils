import { bounceOut } from './bounceOut'

/**
 * 弹跳往返缓动曲线
 * @description EN: Bounce-in-out easing that bounces when starting and when finishing the motion.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function bounceInOut(t: number) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
}
