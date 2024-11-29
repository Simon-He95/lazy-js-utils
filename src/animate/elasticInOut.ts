export function elasticInOut(t: number) {
  return t < 0.5
    ? 0.5
    * Math.sin(((+13.0 * Math.PI) / 2) * 2.0 * t)
    * 2.0 ** (10.0 * (2.0 * t - 1.0))
    : 0.5
      * Math.sin(((-13.0 * Math.PI) / 2) * (2.0 * t - 1.0 + 1.0))
      * 2.0 ** (-10.0 * (2.0 * t - 1.0))
      + 1.0
}
