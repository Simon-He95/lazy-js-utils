export function isRelative(str: string) {
  return /^(\.\.\/|\.\/)/.test(str)
}
