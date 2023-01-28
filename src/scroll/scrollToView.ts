import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'
/**
 * 滚动到可视区域
 * @param {  Element | string | null } e 元素
 * @param options
 * @returns
 */
export function scrollToView(
  e: Element | string | null,
  options?: ScrollIntoViewOptions,
) {
  try {
    if (isStr(e))
      e = findElement(e) as Element
    if (!e)
      return
    e.scrollIntoView(Object.assign({ behavior: 'smooth' }, options))
  }
  catch (error: any) {
    throw new Error(error)
  }
}
