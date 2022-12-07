import fs from 'fs'
import path from 'path'
import process from 'process'
import { isNm } from '../is/isNm'
import { isRelative } from '../is/isRelative'
import { createElement } from '../event/createElement'

export function addStyle(s: string): () => void {
  try {
    const style = createElement('style', {
      type: 'text/css',
    }, isNm(s)
      ? fs.readFileSync(path.resolve(process.cwd(), 'node_modules', s), 'utf8')
      : isRelative(s)
        ? fs.readFileSync(path.resolve(process.cwd(), s), 'utf8')
        : s)
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
