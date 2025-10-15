/**
 * 立方进入缓动曲线
 * @description EN: Cubic ease-in that accelerates following a cubic curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function cubicIn(t: number) {
  return t * t * t
}
