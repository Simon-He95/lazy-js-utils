import { addEventListener } from './addEventListener'
import { mount } from './mount'
export function useElementBounding(element: Element | string, callback: (rect: DOMRect) => void) {
  mount(element, el => callback?.((element = el).getBoundingClientRect()))
  return addEventListener(window, 'scroll', () => callback?.((element as Element).getBoundingClientRect()))
}

