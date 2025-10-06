import { createElement } from '../event/createElement'

/**
 * Add a <script> tag to the document head and return a remover function.
 *
 * @param {string} src Script URL to add to the page.
 * @returns {() => void} Function that removes the inserted script.
 */
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
