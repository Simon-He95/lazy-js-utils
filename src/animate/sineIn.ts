/**
 * 正弦进入缓动曲线
 * @description EN: Sine ease-in that starts gently following a quarter sine wave.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function sineIn(t: number) {
  const v = Math.cos(t * Math.PI * 0.5)
  if (Math.abs(v) < 1e-14)
    return 1
  else return 1 - v
}
