import { mount } from '../utils/mount'
import { unmount } from '../utils/unmount'
import type { MutationObserverInit } from '../types'

/**
 *
 * @param { Element | string | ParentNode | null } element 元素
 * @param { MutationCallback } callback 默认 { childList: true }
 * @param { boolean } [callback.childList] 是否监听孩子元素
 * @param { boolean } [callback.attributes] 是否监听属性
 * @param { boolean } [callback.characterData] 是否监听内容
 * @param { boolean } [callback.subtree] 是否监听树节点
 * @param { boolean } [callback.attributeOldValue] 是否监听旧属性
 * @param { string[] } [callback.attributeFilter] 属性过滤
 * @param options
 * @returns
 */
export function useMutationObserver(
  element: Element | string | ParentNode | null,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true },
) {
  if (!element)
    return
  let stopped = false
  let stop: () => void
  mount(element, (element) => {
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(element, options)
    stop = () => mutationObserver.disconnect()
    if (stopped)
      stop()
  })
  unmount(() => stop?.())
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
