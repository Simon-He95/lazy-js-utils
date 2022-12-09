import { trim } from '../string/trim'
export function compressCss(s: string): string {
  return trim(
    s
      .replace(/\/\*(.|\n)*?\*\//g, '')
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1')
      .replace(/;\s*;/g, ';'),
  )
}
