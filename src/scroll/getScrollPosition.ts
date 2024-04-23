import type { Position } from '../types'

/**
 * 获取滚动条位置
 * @param el 默认window
 * @returns Position
 */
export function getScrollPosition(el: Window = window): Position {
  return {
    x: el.scrollX,
    y: el.scrollY,
  }
}
