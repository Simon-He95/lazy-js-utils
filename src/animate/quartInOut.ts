export function quartInOut(t: number) {
  return t < 0.5 ? +8.0 * t ** 4.0 : -8.0 * (t - 1.0) ** 4.0 + 1.0
}
