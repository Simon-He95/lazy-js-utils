import { createElement } from './createElement'

export function addStyle(s: string) {
  try {
    const style = createElement('style', {
      type: 'text/css',
    })
    style.innerHTML = s
    document.head.appendChild(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
