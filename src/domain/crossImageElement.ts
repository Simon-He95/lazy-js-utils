import { createElement } from '../event'

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
    const w = me.getAttribute('width')
    const h = me.getAttribute('height')
    const style = me.getAttribute('style')
    const c = me.getAttribute('class')
    doc.body.innerHTML = `<img ${w ? `width=${w}` : ''} ${
      h ? `height=${h}` : ''
    } ${style ? `style="${style}"` : ''} ${
      c ? `class="${c}"` : ''
    }  src="${me.getAttribute('src')}" alt="${me.getAttribute('alt')}">`
    doc.body.querySelector('img').onload = function () {
      me.width = ifr.width = this.width
      me.height = ifr.height = this.height
    }
  }
}
