import { isStr } from '../is/isStr'
import { createElement } from './createElement'
import { createFragment } from './createFragment'
import { insertElement } from './insertElement'
import { removeElement } from './removeElement'

export interface IMeta {
  name: 'description' | 'viewport' | 'keywords' | 'robots' | string
  content: string
}
export interface IScript {
  src: string
  type: 'async' | 'module' | 'nomodule' | 'defer'
}
export interface ILink {
  rel: 'stylesheet' | 'preload' | 'icon' | 'prefetch' | string
  href: string
}
export interface HeadOptions {
  title?: string | (() => string)
  meta?: IMeta[]
  script?: IScript[]
  link?: ILink[]
}

/**
 * Mount meta/script/link elements and optionally set document.title.
 * The created nodes are inserted into document.head and a function to remove
 * the created fragment is returned.
 *
 * @param options - Head options (title, meta, script, link)
 * @returns A function that removes the inserted nodes from the head
 */
export function useHead(options: HeadOptions) {
  const { title, meta, script, link } = options
  const fragment = createFragment()
  if (title)
    document.title = isStr(title) ? title : title()

  if (meta && meta.length)
    appendMeta(fragment, meta)

  if (script && script.length)
    appendScript(fragment, script)

  if (link && link.length)
    appendLink(fragment, link)

  insertElement(document.head, fragment)
  return removeElement(fragment)
}

function appendLink(fragment: DocumentFragment, link: ILink[]) {
  fragment.append(
    ...link.map(({ rel, href }) => createElement('link', { rel, href })),
  )
}

function appendMeta(fragment: DocumentFragment, meta: IMeta[]) {
  fragment.append(
    ...meta.map(({ name, content }) =>
      createElement('meta', { name, content }),
    ),
  )
}

function appendScript(fragment: DocumentFragment, script: IScript[]) {
  fragment.append(
    ...script.map(({ src, type }) =>
      createElement(
        'script',
        Object.assign(
          {
            src,
          },
          moduleOrNomodule(type)
            ? {
                type,
              }
            : {
                [type]: '',
              },
        ),
      ),
    ),
  )
}

function moduleOrNomodule(type: string) {
  return type === 'module' || type === 'nomodule'
}
