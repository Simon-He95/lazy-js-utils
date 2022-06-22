export function camelize(s: string): string {
  return s.replace(/-(\w)/g, (all, letter) => letter.toUpperCase())
}
