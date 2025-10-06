import { isStr } from '../is/isStr'
import type { MaybeElement } from '../types'
import { findElement } from './findElement'

/**
 * Return whether two elements overlap (axis-aligned bounding box collision).
 *
 * @param o1 - Element, selector, or null-like value for the first object
 * @param o2 - Element, selector, or null-like value for the second object
 * @returns true if the two bounding boxes overlap, false otherwise
 */
export function collisionDetection(
  o1: MaybeElement,
  o2: MaybeElement,
): boolean {
  const r1 = isStr(o1)
    ? findElement(o1, false)
    : (o1 as HTMLElement | null | undefined)
  const r2 = isStr(o2)
    ? findElement(o2, false)
    : (o2 as HTMLElement | null | undefined)

  const obj1: HTMLElement | null
    = r1 instanceof NodeList
      ? (r1[0] as HTMLElement | null)
      : (r1 as HTMLElement | null | undefined) ?? null
  const obj2: HTMLElement | null
    = r2 instanceof NodeList
      ? (r2[0] as HTMLElement | null)
      : (r2 as HTMLElement | null | undefined) ?? null

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
