import { createElement } from '../event/createElement'
/**
 * head添加link标签
 * @param { string } href css路径
 * @returns
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
