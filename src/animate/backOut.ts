/**
 * 回拉离开缓动曲线
 * @description EN: Back-out easing that overshoots the target before settling at the end.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function backOut(t: number) {
  const s = 1.70158
  return --t * t * ((s + 1) * t + s) + 1
}
