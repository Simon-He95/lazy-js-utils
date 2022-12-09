import { isStr } from '../is/isStr'
import { findElement } from './findElement'

export function collisionDetection(
  o1: string | HTMLElement,
  o2: string | HTMLElement,
) {
  const obj1: HTMLElement = isStr(o1) ? findElement(o1)! : o1
  const obj2: HTMLElement = isStr(o2) ? findElement(o2)! : o2
  if (!obj1 || !obj2)
    return
  const left1_start = obj1.offsetLeft
  const left1_end = obj1.offsetLeft + obj1.offsetWidth
  const left2_start = obj2.offsetLeft
  const left2_end = obj2.offsetLeft + obj2.offsetWidth
  const top1_start = obj1.offsetTop
  const top1_end = obj1.offsetTop + obj1.offsetHeight
  const top2_start = obj2.offsetTop
  const top2_end = obj2.offsetTop + obj2.offsetHeight
  // 判断是否碰撞
  return !(
    left1_start > left2_end
    || left1_end < left2_start
    || top1_start > top2_end
    || top1_end < top2_start
  )
}
