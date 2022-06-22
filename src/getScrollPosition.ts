import { Position } from './types'
export function getScrollPosition(el: Window = window): Position {
  return {
    x: el.scrollX,
    y: el.scrollY
  }
}
