import { isStr } from '../is/isStr'
import { findElement } from './findElement'

/**
 * 删除元素
 * @param {  HTMLElement | ChildNode | DocumentFragment | string } el 待被删除的节点
 * @returns 父节点
 */
export function removeElement(
  el: HTMLElement | ChildNode | DocumentFragment | string,
): HTMLElement | null {
  if (isStr(el))
    el = findElement(el) || el
  if (isStr(el))
    throw new Error(`${el} is not a element`)
  const p = (el as HTMLElement).parentElement
  if (p)
    p.removeChild(el as HTMLElement)
  return p
}
