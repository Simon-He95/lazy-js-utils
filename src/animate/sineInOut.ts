/**
 * 正弦往返缓动曲线
 * @description EN: Sine ease-in-out that follows a half sine wave for smooth start and end.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function sineInOut(t: number) {
  return -0.5 * (Math.cos(Math.PI * t) - 1)
}
