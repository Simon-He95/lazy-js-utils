import { createElement } from '../event/createElement'
export function addScript(src: string): () => void {
  try {
    const t = document.getElementsByTagName('script')[0]
    const s = createElement('script', {
      type: 'text/javascript',
      src,
      async: '',
    })
    t.parentNode?.insertBefore(s, t)
    return () => t.parentNode?.removeChild(s)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
