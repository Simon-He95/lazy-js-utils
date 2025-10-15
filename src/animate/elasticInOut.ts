/**
 * 弹性往返缓动曲线
 * @description EN: Elastic ease-in-out that oscillates at both the start and end of the motion.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function elasticInOut(t: number) {
  return t < 0.5
    ? 0.5
    * Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t)
    * 2.0 ** (10.0 * (2.0 * t - 1.0))
    : 0.5
      * Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0))
      * 2.0 ** (-10.0 * (2.0 * t - 1.0))
      + 1.0
}
