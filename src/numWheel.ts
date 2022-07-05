import { addEventListener } from './addEventListener'
import { isStr } from './isStr'
import { createElement } from './createElement'
import type { NumWheelOptions } from './types'
import { odometer } from './odometer'

export function numWheel(container: string | HTMLElement, options: NumWheelOptions) {
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
  }).update(endVal)
  addEventListener(document, 'DOMContentLoaded', () => {
    if (isStr(container))
      container = document.querySelector(container as string) as HTMLElement || container
    if (isStr(container))
      throw new Error(`numWheel: container ${container} not found`);
    (container as HTMLElement).appendChild(el)
  })
}

