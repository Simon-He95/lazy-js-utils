/**
 * 圆形进入缓动曲线
 * @description EN: Circular ease-in that accelerates as if moving along a quarter circle.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function circIn(t: number) {
  return 1.0 - Math.sqrt(1.0 - t * t)
}
