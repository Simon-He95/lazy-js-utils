import { addEventListener } from './addEventListener'
import { mount } from './mount'

export function useClick(target: string | HTMLElement, callback: () => void) {
  let stop: () => void
  let stopped = false
  mount(target, (target) => {
    stop = addEventListener(target as Element, 'click', callback)
    if (stopped)
      stop?.()
  })
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
