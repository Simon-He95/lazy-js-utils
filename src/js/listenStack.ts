import { useMutationObserver } from '../event/useMutationObserver'

/**
 * 监听目标元素的子元素变化的栈
 * @description EN: Observe mutations (childList, subtree, attributes) on a target element and log a collapsed group trace when changes occur.
 * @param { string | Element } target 元素
 * @returns
 */
export function listenStack(target: string | Element) {
  // 监听目标元素的子元素变化的栈
  return useMutationObserver(
    target,
    () => {
      console.groupCollapsed('childList or sub tree or attributes changed')
      console.trace()
      console.groupEnd()
    },
    {
      childList: true,
      subtree: true,
      attributes: true,
    },
  )
}
