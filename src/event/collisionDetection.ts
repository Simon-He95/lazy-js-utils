import { isStr } from '../is/isStr'
import type { MaybeElement } from '../types'
import { findElement } from './findElement'

/**
 * 检测2个物体是否碰撞
 * @param { MaybeElement } o1 元素1
 * @param { MaybeElement } o2 元素2
 * @returns
 */
export function collisionDetection(o1: MaybeElement, o2: MaybeElement) {
  const obj1: HTMLElement | null = isStr(o1) ? findElement(o1) : o1
  const obj2: HTMLElement | null = isStr(o2) ? findElement(o2) : o2

  if (!obj1 || !obj2)
    return false
  const rect1 = obj1.getBoundingClientRect()
  const rect2 = obj2.getBoundingClientRect()
  const overlapX = Math.max(
    0,
    Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left),
  )
  const overlapY = Math.max(
    0,
    Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top),
  )

  return overlapX > 0 && overlapY > 0
}
