/**
 * 圆形往返缓动曲线
 * @description EN: Circular ease-in-out that starts and ends with circular acceleration and deceleration.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function circInOut(t: number) {
  if ((t *= 2) < 1)
    return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}
