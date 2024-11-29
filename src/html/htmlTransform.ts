import { DomHandler, Parser } from 'htmlparser2'
import type { Element } from 'domhandler'

interface Update {
  setAttribs: (key: string, value?: string) => void
  beforeInsert: (str: string) => void
  afterInsert: (s: string) => void
  renameAttribs: (key: string, value: string) => void
}
type HtmlTransformOptions = Record<
  string,
  (node: Element, update: Update) => void
>

/**
 * htmlparser
 * @param { string } s 字符串
 * @param options {}
 * @param { (key: string, value?: string) => void } options.setAttribs 设置属性
 * @param { (str: string) => void } options.beforeInsert 插入前
 * @param { (s: string) => void } options.afterInsert 插入后
 * @param { (key: string, value?: string) => void } options.renameAttribs 重命名
 * @returns
 */
export function htmlTransform(
  s = '',
  options: HtmlTransformOptions = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const handler = new DomHandler((error: any, dom) => {
      if (error)
        reject(new Error(error))
      else resolve(astToCode(dom as unknown as Element[], options))
    })
    const parser = new Parser(handler, {
      recognizeSelfClosing: true,
      xmlMode: true,
    })
    parser.write(s)
    parser.end()
  })
}

function astToCode(ast: any[], options: HtmlTransformOptions) {
  return ast.reduce((result, node) => {
    const afterAppend: Function[] = []
    const update: Update = {
      setAttribs,
      beforeInsert,
      afterInsert,
      renameAttribs,
    }
    if (node.type === 'tag' || node.type === 'script') {
      options['*']?.(node, update)
      options[node.tagName]?.(node, update)
      for (const key in node.attribs) {
        const fn = options[`$attr$${key}`]
        if (fn) {
          fn(node, update)
          break
        }
      }
      result += node.tagName
        ? `<${node.tagName}${transformProps(node.attribs)}>${astToCode(
          node.children,
          options,
        )}</${node.tagName}>`
        : ''
      afterAppend.forEach(fn => fn())
    }
    if ((node as any).type === 'text')
      result += node.data

    if (node.type === 'comment') {
      const commentNode = options.comment
      if (commentNode)
        commentNode(node, update)
      result += `<!--${node.data}-->`
    }
    return result

    function setAttribs(key: string, value?: string) {
      node.attribs[key] = value
    }

    function renameAttribs(key: string, value: string) {
      node.attribs[value] = node.attribs[key]
      delete node.attribs[key]
    }

    function beforeInsert(str: string) {
      result += str
    }
    function afterInsert(s: string) {
      afterAppend.push(() => (result += s))
    }
  }, '')
}

function transformProps(props: Record<string, string>) {
  return Object.keys(props).reduce((result, key) => {
    const value = props[key]
    if (value === '')
      result += ` ${key}`
    else if (value)
      result += ` ${key}="${value}"`

    return result
  }, '')
}
