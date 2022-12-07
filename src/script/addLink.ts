import { createElement } from '../event/createElement'
export function addLink(str: string): () => void {
  const l = createElement('link', {
    rel: 'stylesheet',
    href: str,
    type: 'text/css',
  })
  document.head.appendChild(l)
  return () => document.head.removeChild(l)
}
