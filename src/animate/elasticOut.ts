/**
 * 弹性离开缓动曲线
 * @description EN: Elastic ease-out that releases with oscillations while settling at the end.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function elasticOut(t: number) {
  return Math.sin((-13.0 * (t + 1.0) * Math.PI) / 2) * 2.0 ** (-10.0 * t) + 1.0
}
