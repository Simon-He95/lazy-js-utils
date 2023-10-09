import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

/**
 * getBoundingClientRect
 * @param { Element | string } element 元素
 * @param { (rect: DOMRect) => void } callback 位置变化回调函数
 * @returns 停止
 */
export function useElementBounding(
  element: Element | string,
  callback: (rect: DOMRect) => void,
) {
  mount(element, (el) => callback?.((element = el).getBoundingClientRect()))
  return useEventListener(window, 'scroll', () =>
    callback?.((element as Element).getBoundingClientRect()),
  )
}
