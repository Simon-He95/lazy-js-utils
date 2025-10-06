import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { findElement } from './findElement'

/**
 * Focus the first input within the provided target when it becomes available.
 *
 * @param target - Element, selector, or 'body' to search input within
 */
export function useFocus(target: MaybeElement = 'body') {
  const isBody = target === 'body'
  mount(target, (target) => {
    const el = findElement('input', isBody ? target : target.parentElement!)
    if (!el)
      return
    if ((el as NodeListOf<Element>).length !== undefined) {
      const first = (el as NodeListOf<Element>)[0]
      if (first instanceof Element && 'focus' in (first as any)) {
        ;(first as unknown as HTMLElement).focus()
      }
    }
    else if (el instanceof Element && 'focus' in (el as any)) {
      ;(el as unknown as HTMLElement).focus()
    }
  })
}
