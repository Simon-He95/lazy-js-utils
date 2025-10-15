/**
 * 指数往返缓动曲线
 * @description EN: Exponential ease-in-out that uses steep growth and decay for a dramatic motion.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function expoInOut(t: number) {
  return t === 0.0 || t === 1.0
    ? t
    : t < 0.5
      ? +0.5 * 2.0 ** (20.0 * t - 10.0)
      : -0.5 * 2.0 ** (10.0 - t * 20.0) + 1.0
}
