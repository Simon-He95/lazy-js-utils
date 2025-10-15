/**
 * 五次进入缓动曲线
 * @description EN: Quintic ease-in that accelerates aggressively using a fifth-power curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quintIn(t: number) {
  return t * t * t * t * t
}
