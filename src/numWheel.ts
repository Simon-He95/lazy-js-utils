import { createElement } from './createElement'
import type { NumWheelOptions } from './types'
import { odometer } from './odometer'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

export function numWheel(container: HTMLElement | string, options: NumWheelOptions) {
  let isMounted = false
  let hasMounted = false
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  function update() {
    if (hasMounted)
      return
    if (isStr(container))
      container = document.querySelector(container as string) as HTMLElement || container
    if (!isMounted && isStr(container))
      return isMounted = true
    else if (isStr(container))
      throw new Error(`${container} is not a HTMLElement`)
    const el = createElement('div')
    const { format = '(,ddd).dd', startVal = 0, endVal, duration = 500, animation = 'countdown' } = options
    const Odometer = odometer()
    new Odometer({
      el,
      value: startVal,
      format,
      theme: 'minimal',
      duration,
      animation,
      auto: false,
    }).update(endVal);
    (container as HTMLElement).appendChild(el)
    hasMounted = true
  }
}

