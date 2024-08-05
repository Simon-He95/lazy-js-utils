export function isHex(hex: string) {
  return /^#[0-9A-F]{2,}$/i.test(hex)
}
