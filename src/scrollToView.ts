import { findElement } from "./findElement"

export function scrollToView(e: Element | string | null) {
  try {
    if (typeof e === 'string')
      e = findElement(e)
    if (!e)
      return
    e.scrollIntoView({
      behavior: 'smooth',
    })
  }
  catch (error: any) {
    throw new Error(error)
  }
}
