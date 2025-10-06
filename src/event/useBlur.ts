import type { MaybeElement } from '../types'
import { mount } from '../utils/mount'
import { useClick } from './useClick'

/**
 * Call callback when focus is lost from the given element.
 * Internally it uses click listeners to determine when clicks happen inside/outside.
 *
 * @param el - Target element or selector
 * @param callback - Called when focus is lost (click outside)
 * @returns A stop function to remove listeners
 */
export function useBlur(el: MaybeElement, callback: () => void) {
  let isFocus = false
  const effects: Function[] = []
  let isStopped = false
  mount(el, (el) => {
    effects.push(
      useClick(el, (e) => {
        isFocus = true
        e.preventDefault()
        e.stopPropagation()
      }),
    )
    effects.push(
      useClick(document, () => {
        if (!isFocus)
          return
        isFocus = false
        callback?.()
      }),
    )
    if (isStopped)
      effects.forEach(stop => stop())
  })
  return () => {
    if (!effects.length)
      return (isStopped = true)
    effects.forEach(stop => stop())
  }
}
