import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

/**
 * 点击事件
 * @param { MaybeElement } target 元素
 * @param { (e: MouseEvent) => void } callback 点击回调
 * @returns 停止
 */
export function useClick(
  target: MaybeElement | Document,
  callback: (e: MouseEvent) => void,
) {
  let stop: () => void
  let stopped = false
  mount(target, (target) => {
    stop = useEventListener(target as Element, 'click', callback)
    if (stopped)
      stop?.()
  })
  return () => {
    if (!stop)
      return (stopped = true)
    stop?.()
  }
}
