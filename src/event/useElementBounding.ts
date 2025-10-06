import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

/**
 * Watch an element's bounding rect and invoke callback when you want to sample it.
 * The function installs a mount handler to obtain the element and returns a
 * scroll listener stop function so callers can keep the rect up-to-date on scroll.
 *
 * @param element - Element or selector to measure
 * @param callback - Receives the element's DOMRect
 * @returns Stop function for the scroll listener
 */
export function useElementBounding(
  element: Element | string,
  callback: (rect: DOMRect) => void,
) {
  mount(element, el => callback?.((element = el).getBoundingClientRect()))
  return useEventListener(window, 'scroll', () =>
    callback?.((element as Element).getBoundingClientRect()))
}
