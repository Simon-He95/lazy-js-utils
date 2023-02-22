export function isHex(hex: string) {
  return /^#[0-9A-Fa-f]{2,}$/.test(hex)
}
