import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'
export function useElementBounding(
  element: Element | string,
  callback: (rect: DOMRect) => void,
) {
  mount(element, el => callback?.((element = el).getBoundingClientRect()))
  return useEventListener(window, 'scroll', () =>
    callback?.((element as Element).getBoundingClientRect()),
  )
}
