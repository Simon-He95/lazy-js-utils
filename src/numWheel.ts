import { addEventListener } from './addEventListener'
import { isStr } from './isStr'
import { createElement } from './createElement'
const Odometer = require('odometer')
require('odometer/themes/odometer-theme-minimal.css')

interface NumWheelOptions {
  format: '(,ddd)' | '(,ddd).dd' | '(.ddd),dd' | '( ddd),dd' | 'd'
  startVal: number
  endVal: number
  duration: number
  animation: 'count' | 'countdown'
}
export function numWheel(container: string | HTMLElement, options: NumWheelOptions) {
  const el = createElement('div')
  const { format = '(,ddd).dd', startVal, endVal, duration = 500, animation = 'countdown' } = options
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

