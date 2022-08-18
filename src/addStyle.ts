import { createElement } from './createElement'

export function addStyle(s: string): () => void {
  try {
    const style = createElement('style', {
      type: 'text/css',
    })
    style.innerHTML = s
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
