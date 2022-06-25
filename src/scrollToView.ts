export function scrollToView(e: Element | string | null) {
  try {
    if (typeof e === 'string')
      e = document.querySelector(e)
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
