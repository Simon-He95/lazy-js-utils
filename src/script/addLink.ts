import { createElement } from '../event/createElement'

/**
 * Add a <link rel="stylesheet"> tag to document head and return a remover.
 *
 * @param {string} href Stylesheet URL.
 * @returns {() => void} Function that removes the link element.
 */
export function addLink(href: string): () => void {
  const l = createElement('link', {
    rel: 'stylesheet',
    href,
    type: 'text/css',
  })
  document.head.appendChild(l)
  return () => document.head.removeChild(l)
}
