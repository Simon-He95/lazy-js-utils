/**
 * 随机hex颜色
 * @returns
 * @description EN: Generate a random 6-digit hex color string like `#a1b2c3`.
 */
export function randomHexColor(): string {
  return `#${(Math.random() * 0xFFFFF * 1000000).toString(16).slice(0, 6)}`
}
