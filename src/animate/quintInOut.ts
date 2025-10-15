/**
 * 五次往返缓动曲线
 * @description EN: Quintic ease-in-out that combines strong acceleration and deceleration using a fifth-power curve.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quintInOut(t: number) {
  if ((t *= 2) < 1)
    return 0.5 * t * t * t * t * t
  return 0.5 * ((t -= 2) * t * t * t * t + 2)
}
