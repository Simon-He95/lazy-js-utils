export function randomHexColor(): string {
  return `#${(Math.random() * 0xFFFFF * 1000000).toString(16).slice(0, 6)}`
}
