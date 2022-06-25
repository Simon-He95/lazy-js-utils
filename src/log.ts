export function log(s: string, color = '#00f', fontSize = 14): void {
  console.log(`%c ${s}`, `color: ${color}; font-size: ${fontSize}px`)
}
