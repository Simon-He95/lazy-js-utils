export function expoOut(t: number) {
  return t === 1.0 ? t : 1.0 - 2.0 ** (-10.0 * t)
}
