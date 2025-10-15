/**
 * 五次离开缓动曲线
 * @description EN: Quintic ease-out that decelerates sharply with a fifth-power falloff.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function quintOut(t: number) {
  return --t * t * t * t * t + 1
}
