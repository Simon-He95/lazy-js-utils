/**
 * 立方往返缓动曲线
 * @description EN: Cubic ease-in-out that accelerates and decelerates with a cubic curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function cubicInOut(t: number) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * (2.0 * t - 2.0) ** 3.0 + 1.0
}
