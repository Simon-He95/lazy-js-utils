/**
 * 指数进入缓动曲线
 * @description EN: Exponential ease-in that starts slowly then grows rapidly.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function expoIn(t: number) {
  return t === 0.0 ? t : 2.0 ** (10.0 * (t - 1.0))
}
