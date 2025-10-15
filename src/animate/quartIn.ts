/**
 * 四次进入缓动曲线
 * @description EN: Quartic ease-in that ramps up rapidly using a fourth-power curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quartIn(t: number) {
  return t ** 4.0
}
