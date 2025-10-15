/**
 * 回拉进入缓动曲线
 * @description EN: Back-in easing that briefly reverses direction before accelerating forward.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function backIn(t: number) {
  const s = 1.70158
  return t * t * ((s + 1) * t - s)
}
