/**
 * 圆形离开缓动曲线
 * @description EN: Circular ease-out that decelerates smoothly toward the end of the motion.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function circOut(t: number) {
  return Math.sqrt((2.0 - t) * t)
}
