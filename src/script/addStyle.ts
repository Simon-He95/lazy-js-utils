import fsp from 'fs/promises'
import path from 'path'
import process from 'process'
import { isNm } from '../is/isNm'
import { isRelative } from '../is/isRelative'
import { createElement } from '../event/createElement'
import { removeElement } from '../event/removeElement'
import { insertElement } from '../event/insertElement'

export async function addStyle(s: string): Promise<() => void> {
  try {
    const style = createElement(
      'style',
      {
        type: 'text/css',
      },
      isNm(s)
        ? await fsp.readFile(
          path.resolve(process.cwd(), 'node_modules', s),
          'utf8',
        )
        : isRelative(s)
          ? await fsp.readFile(path.resolve(process.cwd(), s), 'utf8')
          : s,
    )
    insertElement(document.head, style, null)
    return () => removeElement(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
