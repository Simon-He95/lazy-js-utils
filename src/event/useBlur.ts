import { mount } from '../utils/mount'
import { useClick } from './useClick'

/**
 *
 * @param { string | HTMLElement } el 元素
 * @param { Function } callback 失去焦点时的回调
 * @returns 停止
 */
export function useBlur(el: string | HTMLElement, callback: () => void) {
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
