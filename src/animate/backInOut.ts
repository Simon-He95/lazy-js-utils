/**
 * 回拉往返缓动曲线
 * @description EN: Back-in-out easing that overshoots when starting and ending the motion.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function backInOut(t: number) {
  const s = 1.70158 * 1.525
  if ((t *= 2) < 1)
    return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}
