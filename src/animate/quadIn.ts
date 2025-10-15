/**
 * 二次进入缓动曲线
 * @description EN: Quadratic ease-in that accelerates proportionally to the square of progress.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quadIn(t: number) {
  return t * t
}
