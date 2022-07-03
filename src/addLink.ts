import { createElement } from './createElement'
export function addLink(str: string) {
  document.head.appendChild(createElement('link', {
    rel: 'stylesheet',
    href: str,
    type: 'text/css',
  }))
}
