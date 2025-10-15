/**
 * 正弦离开缓动曲线
 * @description EN: Sine ease-out that eases smoothly to the end along a sine wave.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function sineOut(t: number) {
  return Math.sin((t * Math.PI) / 2)
}
