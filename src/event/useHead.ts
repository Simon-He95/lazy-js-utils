import { isStr } from '../is/isStr'
import { createElement } from './createElement'
import { createFragment } from './createFragment'

export interface IMeta {
  name: string
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

  document.head.appendChild(fragment)
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
