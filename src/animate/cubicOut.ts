/**
 * 立方离开缓动曲线
 * @description EN: Cubic ease-out that decelerates following a cubic falloff.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function cubicOut(t: number) {
  const f = t - 1.0
  return f * f * f + 1.0
}
