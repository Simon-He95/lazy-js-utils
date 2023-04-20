import { trim } from '../string/trim'
export function compressCss(s: string): string {
  return [...s.matchAll(/([^{]+){([^}]+)}/gs)].reduce(
    (result, [_, selector, style]) =>
      (result += `${trim(selector)
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')}{${style.replace(/[\n\s]*/g, '')}}`),
    '',
  )
}
