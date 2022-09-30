import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function useClick(target: string | HTMLElement, callback: () => void) {
  let isMounted = false
  let hasMounted = false
  let stop: () => void
  let stopped = false

  update()
  addEventListener(window, 'DOMContentLoaded', update)

  function update() {
    if (hasMounted)
      return
    if (isStr(target))
      target = document.querySelector(target as string) as HTMLElement || target
    if (!isMounted && isStr(target))
      return isMounted = true
    else if (isStr(target))
      throw new Error(`${target} is not a Element`)
    stop = addEventListener(target, 'click', callback)
    if (stopped)
      stop?.()
    hasMounted = true
  }
  return () => {
    if (!stop)
      return stopped = true
    stop?.()
  }
}
