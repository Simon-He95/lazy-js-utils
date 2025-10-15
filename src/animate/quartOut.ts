/**
 * 四次离开缓动曲线
 * @description EN: Quartic ease-out that slows down using a fourth-power falloff.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quartOut(t: number) {
  return (t - 1.0) ** 3.0 * (1.0 - t) + 1.0
}
