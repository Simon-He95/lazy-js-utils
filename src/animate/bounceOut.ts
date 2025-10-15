/**
 * 弹跳离开缓动曲线
 * @description EN: Bounce-out easing that mimics an object dropping and bouncing to rest.
 * @param { number } t 归一化时间进度，范围 0-1
 * @returns { number }
 */
export function bounceOut(t: number) {
  const a = 4.0 / 11.0
  const b = 8.0 / 11.0
  const c = 9.0 / 10.0

  const ca = 4356.0 / 361.0
  const cb = 35442.0 / 1805.0
  const cc = 16061.0 / 1805.0

  const t2 = t * t

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72
}
