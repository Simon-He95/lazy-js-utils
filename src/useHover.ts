import { addEventListener } from './addEventListener'
import { mount } from './mount'

export function useHover(target: string | HTMLElement, callback: (isHover: boolean) => void): () => void {
  let stopped = false
  const stop: (() => void)[] = []
  mount(target, (target) => {
    stop.push(addEventListener(target, 'mouseenter', () => callback(true)))
    stop.push(addEventListener(target, 'mouseleave', () => callback(false)))
    if (stopped)
      stop.forEach(stop => stop())
  })
  return () => {
    if (!stop.length)
      return stopped = true
    stop.forEach(fn => fn())
  }
}
