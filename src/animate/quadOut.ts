/**
 * 二次离开缓动曲线
 * @description EN: Quadratic ease-out that decelerates with a simple parabolic curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quadOut(t: number) {
  return -t * (t - 2.0)
}
