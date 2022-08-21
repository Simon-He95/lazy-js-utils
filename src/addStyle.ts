import fs from 'fs'
import path from 'path'
import process from 'process'
import { isNm } from './isNm'
import { createElement } from './createElement'
import { isRelative } from './isRelative'

export function addStyle(s: string): () => void {
  try {
    const style = createElement('style', {
      type: 'text/css',
    })
    if (isNm(s))
      s = fs.readFileSync(path.resolve(process.cwd(), 'node_modules', s), 'utf8')
    if (isRelative(s))
      s = fs.readFileSync(path.resolve(process.cwd(), s), 'utf8')
    style.innerHTML = s
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
