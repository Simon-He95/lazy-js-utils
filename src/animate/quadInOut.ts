/**
 * 二次往返缓动曲线
 * @description EN: Quadratic ease-in-out that blends acceleration and deceleration symmetrically.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quadInOut(t: number) {
  t /= 0.5
  if (t < 1)
    return 0.5 * t * t
  t--
  return -0.5 * (t * (t - 2) - 1)
}
