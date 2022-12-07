import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

export function useClick(target: string | HTMLElement, callback: (e: MouseEvent) => void) {
  let stop: () => void
  let stopped = false
  mount(target, (target) => {
    stop = useEventListener(target as Element, 'click', callback)
    if (stopped)
      stop?.()
  })
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
