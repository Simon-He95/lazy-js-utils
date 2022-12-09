import { mount } from '../utils/mount'
import { useEventListener } from './useEventListener'

export function useHover(
  target: string | HTMLElement,
  callback: (isHover: boolean, e: MouseEvent) => void,
): () => void {
  let stopped = false
  const stop: (() => void)[] = []
  mount(target, (target) => {
    stop.push(useEventListener(target, 'mouseenter', e => callback(true, e)))
    stop.push(useEventListener(target, 'mouseleave', e => callback(false, e)))
    if (stopped)
      stop.forEach(stop => stop())
  })
  return () => {
    if (!stop.length)
      return (stopped = true)
    stop.forEach(fn => fn())
  }
}
