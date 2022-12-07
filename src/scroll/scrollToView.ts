import { findElement } from '../event/findElement'
export function scrollToView(e: Element | string | null, options?: ScrollIntoViewOptions) {
  try {
    if (typeof e === 'string')
      e = findElement(e) as Element
    if (!e)
      return
    e.scrollIntoView(Object.assign({ behavior: 'smooth' }, options))
  }
  catch (error: any) {
    throw new Error(error)
  }
}
