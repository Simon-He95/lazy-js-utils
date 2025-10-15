/**
 * 四次往返缓动曲线
 * @description EN: Quartic ease-in-out that uses a fourth-power curve for sharp acceleration and deceleration.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quartInOut(t: number) {
  return t < 0.5 ? +8.0 * t ** 4.0 : -8.0 * (t - 1.0) ** 4.0 + 1.0
}
