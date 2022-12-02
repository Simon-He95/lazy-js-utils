import { useEventListener } from './useEventListener'
import { mount } from './mount'
export function useElementBounding(element: Element | string, callback: (rect: DOMRect) => void) {
  mount(element, el => callback?.((element = el).getBoundingClientRect()))
  return useEventListener(window, 'scroll', () => callback?.((element as Element).getBoundingClientRect()))
}

