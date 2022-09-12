export function isRelative(str: string): boolean {
  return /^(\.\.\/|\.\/)/.test(str)
}
