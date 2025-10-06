import { useMutationObserver } from '../event/useMutationObserver'
import { isArray } from './../is/isArray'

export interface DomTreeItemInterface {
  tag: string
  class?: string
  name?: string
  children?: DomTreeType | string
}

export type DomTreeType = readonly DomTreeItemInterface[]

export function render(
  arr: DomTreeType | DomTreeItemInterface,
  node: ShadowRoot | HTMLElement,
): void {
  arr = isArray(arr) ? arr : [arr]
  arr.forEach((item: DomTreeItemInterface) => {
    const el: HTMLElement = document.createElement(item.tag)

    if (item.class)
      el.className = item.class

    if (item.name)
      el.setAttribute('name', item.name)

    if (typeof item.children === 'string') {
      const text: Text = document.createTextNode(item.children)
      el.appendChild(text)
    }
    else if (item.children) {
      render(item.children, el)
    }

    node.appendChild(el)
  })
}

export class Render extends HTMLElement {
  props: Record<string, string> = {}
  /**
   * 创建影子节点
   * @description EN: A small base class for building Web Components by declaratively rendering a DOM tree and managing shadow DOM styles and attributes.
   * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow
   */
  shadowRoot: ShadowRoot = this.attachShadow({ mode: 'open' })
  constructor() {
    super()
    this.initial()
    this.setupShadow()
  }

  initial(): void {
    useMutationObserver(this, () => this.setProps(), {
      attributes: true,
    })
  }

  /**
   * 初始化影子节点
   */
  setupShadow(): void {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet
    // 渲染组件内部元素节点
    render(this.html(), this.shadowRoot)

    this.renderCss()

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets
  }

  renderCss(): void {
    const stylesheet: CSSStyleSheet = new CSSStyleSheet()
    stylesheet.replaceSync(this.css())
    this.shadowRoot.adoptedStyleSheets = [stylesheet]
  }

  setProps(): void {
    this.props = Array.from(this.attributes).reduce((result, item) => {
      const { name, value } = item
      result[name] = value
      return result
    }, {} as Record<string, string>)

    this.renderCss()
  }

  css(): string {
    throw new Error('必须重写父类 css 方法')
  }

  html(): DomTreeType {
    throw new Error('必须重写父类 html 方法')
  }
}

/*
export class FButton extends Render {
  props: Record<string, string> = {}
  constructor() {
    super()
  }

  css(): string {
    const { type = 'default' } = this.props
    const css = `
    :host {
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      user-select: none;
      text-decoration: none;
      transition: 0.3s;
      line-height: 1;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
      background: ${bgColors[type]};
      width: 105px;
      height: 35px;
      border-radius: 4px;
      padding: 8px 15px;
      display:inline-flex;
      color: ${color[type]};
    }
`

    return css
  }

  html(): DomTreeType {
    return [
      {
        tag: 'slot'
      }
    ] as const
  }

}
*/
