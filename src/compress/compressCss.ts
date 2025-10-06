import { trim } from '../string/trim'

export function compressCss(s: string): string {
  return ([...s.matchAll(/([^{]+)\{([^}]+)\}/g)] as unknown as string[]).reduce(
    (result, [_, selector, style]) =>
      (result += `${trim(selector)
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')}{${style.replace(/\s*/g, '')}}`),
    '',
  )
}

/**
 * @description EN: Minify CSS rules by trimming selectors and removing redundant whitespace in declarations.
 * @param s - CSS string to compress
 * @returns compressed CSS string
 */
