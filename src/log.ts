export function log(s: string | number, color = '#00f', fontSize = 14): void {
  console.log(`%c ${s}`, `color: ${color}; font-size: ${fontSize}px`)
}
