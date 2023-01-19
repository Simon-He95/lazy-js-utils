import { isStr } from '../is/isStr'
import { createElement } from './createElement'
import { createFragment } from './createFragment'

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
 *
 * @param { HeadOptions } options
 * @param { string | (() => string) } options.title 返回一个title字符串
 * @param { IMeta[] } options.meta 'description' | 'viewport' | 'keywords' | 'robots' | string
 * @param { IScript[] } options.script 'async' | 'module' | 'nomodule' | 'defer'
 * @param { ILink[] } options.link 'stylesheet' | 'preload' | 'icon' | 'prefetch' | string
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
