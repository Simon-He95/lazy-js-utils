import { createElement } from '../event/createElement'

const nameReg = /\w+-\w+/
export function crossVideoElement(name = 'video-cors') {
  if (!nameReg.test(name)) {
    return console.error(
      'crossImageElement: The naming must follow this format “xxx-xxx” ',
    )
  }

  window.customElements.define(name, VideoElement)
}

class VideoElement extends HTMLElement {
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
    iframe.onload = () => this.onIfrLoad(iframe, this.shadow.host.innerHTML)
    this.shadow.appendChild(iframe)
  }

  onIfrLoad(ifr: any, children: string) {
    const doc = ifr.contentWindow.document
    doc.body.setAttribute('style', 'margin:0;')
    const attributes = ['width', 'height', 'style', 'class', 'src', 'controls']
    const single = ['controls']
    const attrs = attributes.reduce((result, attribute) => {
      const attr = this.getAttribute(attribute)
      if (single.includes(attribute))
        return (result += `${attribute} `)
      if (!attr)
        return result
      return (result += `${attribute}="${attr}"`)
    }, '')
    doc.body.innerHTML = `<video ${attrs}>${children}</video>`
    doc.body.querySelector('video').onload = () => {
      this.width = ifr.width = this.width
      this.height = ifr.height = this.height
    }
  }
}
