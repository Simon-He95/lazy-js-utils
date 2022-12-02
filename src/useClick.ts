import { useEventListener } from './useEventListener'
import { mount } from './mount'

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
