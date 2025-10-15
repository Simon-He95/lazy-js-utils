/**
 * 弹性进入缓动曲线
 * @description EN: Elastic ease-in that overshoots with oscillations before moving forward.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function elasticIn(t: number) {
  return Math.sin((13.0 * t * Math.PI) / 2) * 2.0 ** (10.0 * (t - 1.0))
}
