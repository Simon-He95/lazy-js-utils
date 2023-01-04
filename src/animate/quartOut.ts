export function quartOut(t: number) {
  return (t - 1.0) ** 3.0 * (1.0 - t) + 1.0
}
