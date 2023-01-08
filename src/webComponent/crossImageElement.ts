import { createElement } from '../event/createElement'

const nameReg = /\w+-\w+/
export function crossImageElement(name = 'img-cors') {
  if (!nameReg.test(name)) {
    return console.error(
      'crossImageElement: The naming must follow this format “xxx-xxx” ',
    )
  }

  window.customElements.define(name, ImageElement)
}

class ImageElement extends HTMLElement {
  shadow: ShadowRoot
  width: any
  height: any
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    const iframe = createElement('iframe', {
      src: 'about:blank',
      frameborder: '0',
    })
    iframe.onload = () => this.onIfrLoad(iframe)
    this.shadow.appendChild(iframe)
  }

  onIfrLoad(ifr: any) {
    const me = this
    const doc = ifr.contentWindow.document
    doc.body.setAttribute('style', 'margin:0;')
    const attributes = ['width', 'height', 'style', 'class', 'alt', 'src']
    const attrs = attributes.reduce((result, attribute) => {
      const attr = me.getAttribute(attribute)
      if (!attr)
        return result
      return (result += `${attribute}="${attr}" `)
    }, '')
    doc.body.innerHTML = `<img ${attrs}>`
    doc.body.querySelector('img').onload = function () {
      me.width = ifr.width = this.width
      me.height = ifr.height = this.height
    }
  }
}
