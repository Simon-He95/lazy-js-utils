export function expoInOut(t: number) {
  return t === 0.0 || t === 1.0
    ? t
    : t < 0.5
      ? +0.5 * 2.0 ** (20.0 * t - 10.0)
      : -0.5 * 2.0 ** (10.0 - t * 20.0) + 1.0
}
