/**
 * 指数离开缓动曲线
 * @description EN: Exponential ease-out that decays rapidly toward the end.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function expoOut(t: number) {
  return t === 1.0 ? t : 1.0 - 2.0 ** (-10.0 * t)
}
